import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable.');
}

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
    const stripeSignature = req.headers['stripe-signature'];
    const event = Stripe.webhooks.constructEvent(
        req.body,
        stripeSignature,
        process.env.STRIPE_WEBHOOK_SECRET
    );

    try {
        await webhookHandlers[event.type](event.data.object);
        res.status(200).json({ received: true });
    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);

        res.status(400).send(`Webhook Error: ${err?.message || 'unknown'}`);
    }
}
