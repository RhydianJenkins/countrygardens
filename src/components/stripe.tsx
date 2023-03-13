import { BasketType } from '@/hooks/useBasket';
import { Box, CircularProgress, Paper } from '@mui/material';
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import React from 'react';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY Stripe public key env variable');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const createPaymentIntent = async ({
    basket,
}: {
    basket: BasketType,
}): Promise<PaymentIntent> => {
    try {
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
                }),
            }
        );

        const paymentIntent = await response.json();

        if (response.status !== 200) {
            return Promise.reject(response);
        }

        return paymentIntent;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Rejecting promise with error', error);

        return Promise.reject(error);
    }
};

export const handlePayment = async ({
    stripe,
    elements,
    onPaymentComplete,
    onPaymentError,
}: {
    stripe: Stripe | null,
    elements: StripeElements | null,
    onPaymentError: (error: StripeError) => void,
    onPaymentComplete: (updatedPaymentIntent: PaymentIntent) => void,
}) => {
    if (!stripe || !elements) {
        return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
    });

    error
        ? onPaymentError(error)
        : onPaymentComplete(paymentIntent);
};

function StripePaymentElement({ setStripe, setElements }: {
    setStripe: (stripe: Stripe|null) => void,
    setElements: (elements: StripeElements|null) => void,
}) {
    const stripe = useStripe();
    const elements = useElements();

    React.useEffect(() => {
        setStripe(stripe);
        setElements(elements);
    }, [stripe, elements]);

    return (
        <section>
            <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ['GB'],
                autocomplete: {
                    mode: 'google_maps_api',
                    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
                },
            }} />
            <PaymentElement />
        </section>
    );
}

function StripePaymentFields({ clientSecret, setStripe, setElements }: {
    clientSecret: string|null,
    setStripe: (stripe: Stripe|null) => void,
    setElements: (elements: StripeElements|null) => void,
}) {
    if (!clientSecret) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '10em',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                padding: '1em',
                backgroundColor: 'primary.main',
            }}
        >
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentElement setStripe={setStripe} setElements={setElements} />
            </Elements>
        </Paper>
    );
}

export default StripePaymentFields;
