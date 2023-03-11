import { BasketType } from '@/hooks/useBasket';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const MIN_AMOUNT = 50;
const MAX_AMOUNT = 100000;
const PAYMENT_METHOD_TYPE = 'card';
const CURRENCY = 'gbp';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

const calculateAmount = (basket: BasketType): number => {
    // TODO
    return 123;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const basket = req.body.basket;

    if (!basket) {
        return res.status(422).json({ error: 'Missing basket' });
    }

    const amount = calculateAmount(basket); // TODO get products from request body and calculate amount

    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
        return res.status(422).json({ error: 'Invalid basket value.' });
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
        return res.status(500).json(err);
    }
}
