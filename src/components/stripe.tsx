import { BasketContext, BasketType } from '@/hooks/useBasket';
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import React from 'react';
import { CheckoutFieldValues } from './checkoutFields';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY Stripe public key env variable');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const createPaymentIntent = async ({
    basket,
    userDetails,
}: {
    basket: BasketType,
    userDetails: CheckoutFieldValues,
}): Promise<PaymentIntent> => {
    const paymentIntent: PaymentIntent = await fetch(
        'api/payments',
        {
            method: 'POST',
            body: {
                basket,
                userDetails,
            },
        }
    );

    return paymentIntent;
};

export async function handlePayment({
    paymentIntent,
    setPaymentIntent,
}: {
    paymentIntent: PaymentIntent|null,
    setPaymentIntent: (pi: PaymentIntent) => void,
}) {
    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // TODO Make sure to disable form submission until Stripe.js has loaded.

        // eslint-disable-next-line no-console
        console.error('Stripe.js has not yet loaded');

        return;
    }

    if (!paymentIntent) {
        throw new Error('Missing payment intent');
    }

    const card = elements.getElement(CardElement);
    const clientSecret = paymentIntent.client_secret;

    if (!card || !clientSecret) {
        throw new Error('Missing cardElement or clientSecret');
    }

    const {
        paymentIntent: updatedPaymentIntent,
        error,
    } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: { card },
        }
    );

    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        error.payment_intent && setPaymentIntent(error.payment_intent);
        return;
    }

    setPaymentIntent(updatedPaymentIntent);
}

function StripePaymentFields({ clientSecret }: {
    userDetails: CheckoutFieldValues,
    clientSecret: string,
}) {
    console.log('clientSecret', clientSecret);

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentElement />
        </Elements>
    );
}

export default StripePaymentFields;
