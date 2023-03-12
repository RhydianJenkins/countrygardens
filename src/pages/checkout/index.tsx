import CheckoutFields, { CheckoutFieldValues } from "@/components/checkoutFields";
import Basket from "@/components/basket";
import { formatter } from "@/components/product";
import { BasketContext } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import StripePaymentFields, { createPaymentIntent, handlePayment } from "@/components/stripe";
import { PaymentIntent, Stripe, StripeElements } from "@stripe/stripe-js";

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

type StepControlsProps = {
    basket: BasketType;
    handleBack: () => void;
    activeStep: number;
    priceString: string;
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

function StepControls({ basket, handleBack, activeStep, priceString }: StepControlsProps) {
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
                disabled={Object.keys(basket).length === 0}
                sx={{
                    backgroundColor: 'secondary.main',
                }}
            >
                <Typography>{getProgressButtonText({ activeStep, priceString })}</Typography>
            </MuiButton>
        </Box>
    );
}

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    const { basket } = React.useContext(BasketContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);
    const [paymentIntent, setPaymentIntent] = React.useState<PaymentIntent|null>(null);
    const [stripe, setStripe] = React.useState<Stripe|null>(null);
    const [elements, setElements] = React.useState<StripeElements|null>(null);

    const priceString = formatter.format(totalBasketCost / 100);

    React.useEffect(() => {
        const basketPrices = Object.entries(basket).map(([id, number]) => {
            const product = allProducts.find(product => product.id === id);
            const productCost = product?.value || 0;

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

    const onPaymentComplete = (updatedPaymentIntent: PaymentIntent) => {
        setPaymentIntent(updatedPaymentIntent);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        switch (activeStep) {
        case 0:
            setPaymentIntent(await createPaymentIntent({ basket }));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            break;
        case 1:
            await handlePayment({
                stripe,
                elements,
                onPaymentComplete,
            });
            break;
        case 2:
            return;

        default: throw new Error('Unknown checkout step');
        }
    };

    return (
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
                />}

                <StepControls
                    basket={basket}
                    handleBack={handleBack}
                    activeStep={activeStep}
                    priceString={priceString}
                />
            </form>
        </Box>
    );

}

export default CheckoutPage;
