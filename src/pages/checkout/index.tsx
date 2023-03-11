import AddressForm from "@/components/addressForm";
import Basket from "@/components/basket";
import { formatter } from "@/components/product";
import { BasketContext } from "@/hooks/useBasket";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { Button as MuiButton, Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

type StepControlsProps = {
    handleNext: () => void;
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

function StepControls({ handleNext, handleBack, activeStep, priceString }: StepControlsProps) {
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
                variant="contained"
                onClick={handleNext}
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

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            alert('Payment not implemented');
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            // eslint-disable-next-line no-console
            console.warn('Attempted to go back from first step');
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

            {activeStep === 0 && <Basket
                allProducts={allProducts}
                totalPrice={formatter.format(totalBasketCost / 100)}
            />}

            {activeStep === 1 && <AddressForm />}

            {activeStep === 2 && <Typography variant='h2'>This will be where you pay</Typography>}

            <StepControls
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                priceString={formatter.format(totalBasketCost / 100)}
            />
        </Box>
    );

}

export default CheckoutPage;
