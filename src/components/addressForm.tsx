import { Box, TextField, Typography } from "@mui/material";

function AddressForm() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Form submitted');
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 40em)',
            padding: '1em',
            flexGrow: 1,
        }}>
            <Typography variant="h6" gutterBottom sx={{ marginLeft: '1em' }}>Address</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <TextField
                        required
                        label="Address Line 1"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Address Line 2"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Postcode"
                        variant="outlined"
                        margin="normal"
                    />
                </Box>
            </form>
        </Box>
    );
}

export default AddressForm;
