import { BasketType } from '@/hooks/useBasket';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { getProducts } from '../products';

const MIN_AMOUNT = 50;
const MAX_AMOUNT = 100000;
const PAYMENT_METHOD_TYPE = 'card';
const CURRENCY = 'gbp';
const STRIPE_API_VERSION = '2022-11-15';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createNodeHttpClient(),
});

const calculateAmount = async (basket: BasketType, res: NextApiResponse): Promise<number> => {
    const allProducts = await getProducts();

    const totalCost = Object.entries(basket).reduce((acc, [productId, quantity]) => {
        const product = allProducts.find((p) => p.id === productId);

        if (!product) {
            res.status(422).json({ error: `Invalid product id: ${productId}` });
            return 0;
        }

        return acc + (product.value * quantity);
    }, 0);

    return totalCost;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        res.end();
    }

    const basket = req.body.basket;

    if (!basket) {
        res.status(422).json({ error: 'Missing basket from request body' });
        res.end();
    }

    const amount = await calculateAmount(basket, res);

    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
        res.status(422).json({
            error: 'Invalid basket value',
            min: MIN_AMOUNT,
            max: MAX_AMOUNT,
            givenAmount: amount,
        });
        res.end();
    }

    try {
        const params: Stripe.PaymentIntentCreateParams = {
            payment_method_types: [PAYMENT_METHOD_TYPE],
            currency: CURRENCY,
            amount,
        };

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
            params
        );

        res.status(200).json(paymentIntent);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.status(500).json(err);
    }
}
