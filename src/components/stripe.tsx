import { BasketType } from '@/hooks/useBasket';
import { Box, CircularProgress } from '@mui/material';
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, Stripe, StripeElements } from '@stripe/stripe-js';
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
    const response = await fetch(
        'api/payments',
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
            },
            body: JSON.stringify({
                basket,
                userDetails,
            }),
        }
    );

    const paymentIntent = await response.json();

    return paymentIntent;
};

export const handlePayment = async ({
    clientSecret,
    setPaymentIntent,
    stripe,
    elements,
}: {
    clientSecret: string|null,
    setPaymentIntent: (paymentIntent: PaymentIntent) => void,
    stripe: Stripe | null,
    elements: StripeElements | null,
}) => {
    if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // TODO Make sure to disable form submission until Stripe.js has loaded.
        console.log('Stripe.js has not yet loaded.');
        return;
    }

    if (!clientSecret) {
        console.error('No client secret provided');
        return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
        console.error('No card element found');
        return;
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
        console.error(error);
        error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
        setPaymentIntent(updatedPaymentIntent);
    }
};

function StripePaymentElement({ setStripe, setElements }: {
    setStripe: (stripe: Stripe) => void,
    setElements: (elements: StripeElements) => void,
}) {
    const stripe = useStripe();
    const elements = useElements();

    stripe && setStripe(stripe);
    elements && setElements(elements);

    return (<PaymentElement />);
}

function StripePaymentFields({ clientSecret, setStripe, setElements }: {
    clientSecret: string,
    setStripe: (stripe: Stripe) => void,
    setElements: (elements: StripeElements) => void,
}) {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripePaymentElement setStripe={setStripe} setElements={setElements} />
        </Elements>
    );
}

export default StripePaymentFields;
