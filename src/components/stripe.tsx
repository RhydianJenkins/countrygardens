import { BasketType } from '@/hooks/useBasket';
import { Box, CircularProgress, Paper } from '@mui/material';
import { AddressElement, Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import React from 'react';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY Stripe public key env variable');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type createPaymentIntentProps = {
    basket: BasketType,
}

type handlePaymentProps = {
    stripe: Stripe | null,
    elements: StripeElements | null,
    onPaymentError: (error: StripeError) => void,
    onPaymentComplete: (updatedPaymentIntent: PaymentIntent) => void,
    customerEmail: string,
}

type stripePaymentElementProps = {
    setStripe: (stripe: Stripe|null) => void,
    setElements: (elements: StripeElements|null) => void,
    setCustomerEmail: (email: string) => void,
}

type stripePaymentFieldsProps = {
    clientSecret: string|null,
    setStripe: (stripe: Stripe|null) => void,
    setElements: (elements: StripeElements|null) => void,
    setCustomerEmail: (email: string) => void,
}

export const createPaymentIntent = async ({ basket }: createPaymentIntentProps): Promise<PaymentIntent> => {
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
    customerEmail,
}: handlePaymentProps) => {
    if (!stripe || !elements) {
        return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
            receipt_email: customerEmail,
        },
    });

    error
        ? onPaymentError(error)
        : onPaymentComplete(paymentIntent);
};

function StripePaymentElement({ setStripe, setElements, setCustomerEmail }: stripePaymentElementProps) {
    const stripe = useStripe();
    const elements = useElements();

    React.useEffect(() => {
        setStripe(stripe);
        setElements(elements);
    }, [stripe, elements]);

    return (
        <section>
            <LinkAuthenticationElement onChange={({ value }) => {
                setCustomerEmail(value.email);
            }} />
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

function StripePaymentFields({ clientSecret, setStripe, setElements, setCustomerEmail }: stripePaymentFieldsProps) {
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
            <Elements stripe={stripePromise} options={{ clientSecret, loader: 'auto' }}>
                <StripePaymentElement
                    setStripe={setStripe}
                    setElements={setElements}
                    setCustomerEmail={setCustomerEmail}
                />
            </Elements>
        </Paper>
    );
}

export default StripePaymentFields;
