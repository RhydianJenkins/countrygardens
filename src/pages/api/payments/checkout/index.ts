import { BasketType } from '@/hooks/useBasket';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getProducts } from '../../products';

const STRIPE_API_VERSION = '2022-11-15';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        res.end();
        return;
    }

    const basket: BasketType = req.body.basket;

    if (!basket) {
        res.status(422).json({ error: 'Missing basket from request body' });
        res.end();
        return;
    }

    try {
        const allProducts = await getProducts();
        const lineItems = Object.entries(basket).map(([productId, quantity]) => {
            const product = allProducts.find(({ id }) => id === productId);
            const price =  product?.price?.id;

            return { price, quantity };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/checkout?success=true`,
            cancel_url: `${req.headers.origin}/checkout`,
            expand: ['payment_intent'],
            shipping_address_collection: {
                allowed_countries: ['GB'],
            },
        });

        if (!session?.url) {
            res.status(500).json({ error: 'Failed to create checkout session' });
            return;
        }

        res.status(201).json({ url: session.url });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        res.status(500).json(err);
        res.end();
    }
}
