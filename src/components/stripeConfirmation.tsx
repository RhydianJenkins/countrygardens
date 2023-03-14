import { Box, Typography } from "@mui/material";

function StripeConfirmation() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            jusifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
        }} >
            <Typography variant='h2'>Thank you!</Typography>
            <Typography variant='subtitle1'>We have received your order</Typography>
            <Typography>You should receive an email with details</Typography>
        </Box>
    );
}

export default StripeConfirmation;
