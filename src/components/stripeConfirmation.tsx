import { Box, Typography } from "@mui/material";
import { PaymentIntent } from "@stripe/stripe-js";

type ConfirmationProps = {
    paymentIntent: PaymentIntent|null;
}

function StripeConfirmation({ paymentIntent }: ConfirmationProps) {
    if (!paymentIntent) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                jusifyContent: 'center',
                alignItems: 'center',
                gap: '1em',
            }} >
                <Typography variant='h2'>Something went wrong</Typography>
            </Box>
        );
    }

    if (paymentIntent.status !== 'succeeded') {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                jusifyContent: 'center',
                alignItems: 'center',
                gap: '1em',
            }} >
                <Typography variant='h1'>We're sorry, something went wrong</Typography>
                <Typography variant='subtitle1'>Payment status: {paymentIntent.status}</Typography>
                <Typography variant='caption'>{paymentIntent.description}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            jusifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
        }} >
            <Typography variant='h2'>Thank you!</Typography>
            <Typography variant='subtitle1'>We have received your order <Typography variant='caption'>({paymentIntent.id})</Typography></Typography>
            <Typography>You should receive an email with details</Typography>
        </Box>
    );
}

export default StripeConfirmation;
