import {loadStripe} from '@stripe/stripe-js/pure';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY Stripe public key env variable');
}

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
