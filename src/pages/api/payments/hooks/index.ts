import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const webhookHandlers = {
    'payment_intent.succeeded': async (paymentIntent: Stripe.PaymentIntent) => {
        // Add your business logic here
    },
    'payment_intent.payment_failed': async (paymentIntent: Stripe.PaymentIntent) => {
        // Add your business logic here
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(400).send('Webhook not yet implemented');
}
