import CheckoutFields, { CheckoutFieldValues } from "@/components/checkoutFields";
import Basket from "@/components/basket";
import { formatter } from "@/components/product";
import { BasketContext, BasketType } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import StripePaymentFields, { createPaymentIntent, handlePayment } from "@/components/stripe";
import { PaymentIntent, Stripe, StripeElements } from "@stripe/stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

type StepControlsProps = {
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

const steps = ['Basket', 'Your Details', 'Payment'];

function StepControls({ handleBack, activeStep, priceString }: StepControlsProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            margin: '1em',
        }}>
            <MuiButton
                disabled={activeStep === 0}
                onClick={handleBack}
                variant='contained'
            >
              Back
            </MuiButton>

            <Box sx={{ flex: '1 1 auto' }} />

            <MuiButton
                type='submit'
                variant="contained"
                sx={{
                    backgroundColor: 'secondary.main',
                }}
            >
                <Typography>{activeStep === steps.length - 1 ? `Pay ${priceString}` : 'Next'}</Typography>
            </MuiButton>
        </Box>
    );
}

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    const { basket } = React.useContext(BasketContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentIntent, setPaymentIntent] = React.useState<PaymentIntent|null>(null);

    // TODO these are updating midrerender so they're not working correctly
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

    const onSubmit = async (userDetails: CheckoutFieldValues) => {
        switch (activeStep) {
        case 0:
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            break;
        case 1:
            setPaymentIntent(await createPaymentIntent({ basket, userDetails }));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            break;
        case 2:
            handlePayment({
                clientSecret: paymentIntent?.client_secret || null,
                setPaymentIntent,
                stripe,
                elements,
            });
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

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 && <Basket
                    allProducts={allProducts}
                    totalPrice={priceString}
                />}

                {activeStep === 1 && <CheckoutFields
                    register={register}
                    errors={errors}
                />}

                {activeStep === 2 && <StripePaymentFields
                    clientSecret={paymentIntent?.client_secret || null}
                    setStripe={setStripe}
                    setElements={setElements}
                />}

                <StepControls
                    handleBack={handleBack}
                    activeStep={activeStep}
                    priceString={priceString}
                />
            </form>
        </Box>
    );

}

export default CheckoutPage;
