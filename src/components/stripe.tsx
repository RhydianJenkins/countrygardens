import { BasketType } from '@/hooks/useBasket';
import { Box, CircularProgress, Paper } from '@mui/material';
import { AddressElement, CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, Stripe, StripeElements } from '@stripe/stripe-js';
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

    return paymentIntent;
};

export const handlePayment = async ({
    clientSecret,
    stripe,
    elements,
    onComplete,
}: {
    clientSecret: string|null,
    stripe: Stripe | null,
    elements: StripeElements | null,
    onComplete: (updatedPaymentIntent: PaymentIntent) => void,
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
        console.log('elements', elements);
        console.log('elements.getElement(CardElement)', elements.getElement(CardElement));
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
        console.error('PAYMENT FAIL', error);
        return;
    }

    onComplete(updatedPaymentIntent);
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
                fields: {
                    phone: 'always',
                },
                validation: {
                    phone: {
                        required: 'always',
                    },
                },
            }} />
            <CardElement options={{ }}/>
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
