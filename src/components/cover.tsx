import { Box, Typography } from '@mui/material';
import NextImage from 'next/image';

function Info() {
    return (
        <Box sx={{
            width: '80%',
            height: '50%',
            padding: '16px',
            textAlign: 'center',
            position: 'relative',
            objectFit: 'cover',
            backgroundColor: 'red',
        }}>
            <NextImage
                src="/logo.jpg"
                alt="Country Gardens Logo"
                fill
            />
            <Typography variant="h2" component="h2">Greengrocer</Typography>
        </Box>
    );
}
export default function Cover() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100vw',
            height: '512px',
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
