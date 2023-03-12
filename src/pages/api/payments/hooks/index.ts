import { NextApiRequest, NextApiResponse } from 'next';

const webhookHandlers = {
    'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
        // Add your business logic here
    },
    'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
        // Add your business logic here
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(400).send('Webhook not yet implemented');
}
