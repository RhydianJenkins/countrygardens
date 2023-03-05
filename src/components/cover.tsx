import { Box, Typography } from '@mui/material';

function Info() {
    return (
        <Box sx={{
            backgroundColor: 'secondary.main',
            minWidth: '20em',
            minHeight: '10em',
            position: 'relative',
            padding: '16px',
            textAlign: 'center',
        }}>
            <Typography variant="h1" component="h1">Country Gardens</Typography>
            <Typography variant="h2" component="h2">Greengrocer</Typography>
        </Box>
    );
}
export default function Cover() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100vw',
            minHeight: '1024px',
            maxHeight: '80vh',
            spacing: 0,
            justify: 'space-around',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-32px',
        }}>
            <Info />
        </Box>
    );
}
