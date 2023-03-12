import { BasketType } from '@/hooks/useBasket';
import { Box, CircularProgress } from '@mui/material';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
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

function StripePaymentFields({ clientSecret }: {
    userDetails: CheckoutFieldValues,
    clientSecret: string|null,
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
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentElement />
        </Elements>
    );
}

export default StripePaymentFields;
