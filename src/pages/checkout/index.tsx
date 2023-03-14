import Basket from "@/components/basket";
import { formatUnitAmount } from "@/components/product";
import { BasketContext, BasketType } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import React from "react";

type StepControlsProps = {
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
        await fetch(
            'api/payments/checkout',
            {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    basket,
                }),
            }
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Rejecting promise with error', error);

        return Promise.reject(error);
    }
};

function StepControls({ submitButtonDisabled, submitButtonLoading }: StepControlsProps) {
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
                <Typography>Next</Typography>
            </MuiButton>
        </Box>
    );
}

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    const { basket } = React.useContext(BasketContext);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

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

    React.useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        createCheckoutSession(basket).finally(() => setLoading(false));
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

            <form onSubmit={onSubmit}>
                <Box
                    paddingLeft={{ xs: '0', md: '10em' }}
                    paddingRight={{ xs: '0', md: '10em' }}
                    maxWidth={{ xs: '100%', md: '80em' }}
                    paddingTop='10em'
                    margin='auto'
                >
                    <Stepper sx={{ marginBottom: '5em' }} alternativeLabel >
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

                    <Basket allProducts={allProducts} totalPrice={priceString} />

                    <StepControls submitButtonLoading={loading} />
                </Box>
            </form>
        </>
    );

}

export default CheckoutPage;
