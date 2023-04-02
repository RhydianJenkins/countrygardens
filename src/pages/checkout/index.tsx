import Basket from "@/components/basket";
import { formatUnitAmount } from "@/components/product";
import StripeConfirmation from "@/components/stripeConfirmation";
import { BasketContext, BasketType } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography, CircularProgress, Snackbar, Alert, AlertColor } from "@mui/material";
import React from "react";
import { useRouter } from 'next/router';

type StepControlsProps = {
    actionButtonText?: string,
    submitButtonDisabled?: boolean,
    submitButtonLoading?: boolean,
}

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

export const getStaticProps = async () => {
    const allProducts = await getProducts();

    return {
        props: { allProducts },
        revalidate: 20,
    };
};

const steps = ['Basket', 'Payment', 'Confirmation'];

const createCheckoutSession = async (basket: BasketType) => {
    try {
        const response = await fetch(
            'api/payments/checkout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    basket,
                }),
            }
        );

        if (response.status !== 201) {
            throw new Error('Failed to create checkout session');
        }

        const { url } = await response.json();
        window.location.href = url;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Rejecting promise with error', error);

        return Promise.reject(error);
    }
};

function StepControls({ submitButtonDisabled, submitButtonLoading, actionButtonText = 'Next' }: StepControlsProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            margin: '1em',
        }}>
            <Box sx={{ flex: '1 1 auto' }} />

            <MuiButton
                type='submit'
                variant="contained"
                disabled={submitButtonDisabled || submitButtonLoading}
                sx={{
                    backgroundColor: 'secondary.main',
                }}
            >
                {submitButtonLoading && <CircularProgress size={'2em'} sx={{ marginRight: '1em' }}/>}
                <Typography>{actionButtonText}</Typography>
            </MuiButton>
        </Box>
    );
}

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    const { basket, clearBasket } = React.useContext(BasketContext);
    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [snackbarAlertColor, setSnackbarAlertColor] = React.useState<AlertColor>('success');
    const router = useRouter();
    const [actionButtonText, setActionButtonText] = React.useState('Next');
    const [totalPriceString, setTotalPriceString] = React.useState('INITIAL');

    const showSnackbar = (message: string, alertColor: AlertColor = 'info') => {
        setSnackbarMessage(message);
        setSnackbarAlertColor(alertColor);
        setSnackbarOpen(true);
    };

    const getActionButtonText = (price: string): string => {
        const query = new URLSearchParams(window.location.search);

        if (query.get('success') || Object.keys(basket).length === 0) {
            return 'Back to home';
        }

        return `Checkout (${price})`;
    };

    const refreshBasket = () => {
        const basketPrices = Object.entries(basket).map(([id, number]) => {
            const product = allProducts.find(product => product.id === id);
            const productCost = product?.price?.unit_amount || 0;

            return number * productCost;
        });

        const newTotalBasketCost = basketPrices.reduce((acc, cur) => {
            return acc + cur;
        }, 0);

        const totalPriceString = formatUnitAmount(newTotalBasketCost);
        setTotalPriceString(totalPriceString);
        setActionButtonText(getActionButtonText(totalPriceString));
    };

    React.useEffect(() => {
        refreshBasket();
    }, [basket]);

    React.useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            showSnackbar('Order placed! You will receive an email confirmation.', 'success');
            setSuccess(true);
            clearBasket();
        }

        if (query.get('canceled')) {
            showSnackbar('Order cancelled. You will receive an email confirmation.', 'info');
        }

        refreshBasket();
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (success || Object.keys(basket).length === 0) {
            router.push('/');
            return;
        }

        setLoading(true);
        await createCheckoutSession(basket);
        setLoading(false);
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
                    severity={snackbarAlertColor}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <form onSubmit={onSubmit}>
                <Box
                    paddingLeft={{ xs: '0', md: '10em' }}
                    paddingRight={{ xs: '0', md: '10em' }}
                    maxWidth={{ xs: '100%', md: '80em' }}
                    paddingTop='10em'
                    margin='auto'
                >
                    <Stepper activeStep={success ? 2 : 0} sx={{ marginBottom: '5em' }} alternativeLabel>
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

                    {success && <StripeConfirmation />}

                    {!success && <Basket allProducts={allProducts} totalPrice={totalPriceString} />}

                    <StepControls actionButtonText={actionButtonText} submitButtonLoading={loading} />
                </Box>
            </form>
        </>
    );

}

export default CheckoutPage;
