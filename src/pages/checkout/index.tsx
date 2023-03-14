import Basket from "@/components/basket";
import { formatUnitAmount } from "@/components/product";
import { BasketContext, BasketType } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import React from "react";
import StripePaymentFields, { createPaymentIntent, handlePayment } from "@/components/stripe";
import { PaymentIntent, Stripe, StripeElements, StripeError } from "@stripe/stripe-js";
import { useRouter } from 'next/router';
import StripeConfirmation from "@/components/stripeConfirmation";

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

type StepControlsProps = {
    basket: BasketType;
    handleBack: () => void;
    activeStep: number;
    priceString: string;
    nextButtonLoading?: boolean;
}

export const getStaticProps = async () => {
    const allProducts = await getProducts();

    return {
        props: { allProducts },
        revalidate: 20,
    };
};

const steps = ['Basket', 'Payment', 'Confirmation'];

function getProgressButtonText({ activeStep, priceString }: {
    activeStep: number,
    priceString: string
}) {
    if (activeStep === 0) {
        return 'Go to payment';
    }

    if (activeStep === 1) {
        return `Pay ${priceString}`;
    }

    return 'Got it';
}

function StepControls({ basket, handleBack, activeStep, priceString, nextButtonLoading }: StepControlsProps) {
    const [nextDisabled, setNextDisabled] = React.useState(false);

    React.useEffect(() => {
        const basketIsEmpty = Object.keys(basket).length === 0;
        const isOnPaymentStep = activeStep === 2;

        setNextDisabled(basketIsEmpty && !isOnPaymentStep);
    }, [basket]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            margin: '1em',
        }}>
            {activeStep === 1 && <MuiButton
                onClick={handleBack}
                variant='contained'
            >
                Back
            </MuiButton>}

            <Box sx={{ flex: '1 1 auto' }} />

            <MuiButton
                type='submit'
                variant="contained"
                disabled={nextDisabled || nextButtonLoading}
                sx={{
                    backgroundColor: 'secondary.main',
                }}
            >
                {nextButtonLoading && <CircularProgress size={'2em'} sx={{ marginRight: '1em' }}/>}
                <Typography>{getProgressButtonText({ activeStep, priceString })}</Typography>
            </MuiButton>
        </Box>
    );
}

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    const { basket, clearBasket } = React.useContext(BasketContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);
    const [paymentIntent, setPaymentIntent] = React.useState<PaymentIntent|null>(null);
    const [stripe, setStripe] = React.useState<Stripe|null>(null);
    const [elements, setElements] = React.useState<StripeElements|null>(null);
    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [customerEmail, setCustomerEmail] = React.useState('');
    const router = useRouter();

    const priceString = formatUnitAmount(totalBasketCost);

    React.useEffect(() => {
        const basketPrices = Object.entries(basket).map(([id, number]) => {
            const product = allProducts.find(product => product.id === id);
            const productCost = product?.price?.unit_amount || 0;

            return number * productCost;
        });

        const newTotalBasketCost = basketPrices.reduce((acc, cur) => {
            return acc + cur;
        }, 0);

        setTotalBasketCost(newTotalBasketCost);
    }, [basket]);

    const handleBack = () => {
        if (activeStep === 0) {
            // eslint-disable-next-line no-console
            console.warn('Attempted to go back from first step');
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const fetchNewPaymentIntent = async () => {
        try {
            const paymentIntent = await createPaymentIntent({ basket });
            setPaymentIntent(paymentIntent);
        } catch (error) {
            setSnackbarMessage('Sorry, something went wrong');
            setSnackbarOpen(true);

            // eslint-disable-next-line no-console
            console.error(error);
            throw new Error('Failed to create stripe payment intent');
        }
    };

    const onPaymentComplete = (updatedPaymentIntent: PaymentIntent) => {
        setPaymentIntent(updatedPaymentIntent);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        clearBasket();
    };

    const onPaymentError = ({ message }: StripeError) => {
        setSnackbarMessage(message || 'Sorry, something went wrong');
        setSnackbarOpen(true);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        switch (activeStep) {
        case 0:
            setLoading(true);
            fetchNewPaymentIntent();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setLoading(false);
            break;
        case 1:
            setLoading(true);
            await handlePayment({
                stripe,
                elements,
                onPaymentComplete,
                onPaymentError,
                customerEmail,
            });
            setLoading(false);
            break;
        case 2:
            router.push('/');
            return;

        default: throw new Error('Unknown checkout step');
        }
    };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="error"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box
                paddingLeft={{ xs: '0', md: '10em' }}
                paddingRight={{ xs: '0', md: '10em' }}
                maxWidth={{ xs: '100%', md: '80em' }}
                paddingTop='10em'
                margin='auto'
            >
                <Stepper
                    sx={{
                        marginBottom: '5em',
                    }}
                    activeStep={activeStep}
                    alternativeLabel
                >
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode; } = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <form noValidate onSubmit={(test) => onSubmit(test)}>
                    {activeStep === 0 && <Basket
                        allProducts={allProducts}
                        totalPrice={priceString}
                    />}

                    {activeStep === 1 && <StripePaymentFields
                        clientSecret={paymentIntent?.client_secret || null}
                        setStripe={setStripe}
                        setElements={setElements}
                        setCustomerEmail={setCustomerEmail}
                    />}

                    {activeStep === 2 && <StripeConfirmation paymentIntent={paymentIntent} />}

                    <StepControls
                        basket={basket}
                        handleBack={handleBack}
                        activeStep={activeStep}
                        priceString={priceString}
                        nextButtonLoading={loading}
                    />
                </form>
            </Box>
        </>
    );

}

export default CheckoutPage;
