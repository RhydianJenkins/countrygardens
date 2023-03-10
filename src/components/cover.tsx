import { Box } from '@mui/material';
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
        }}>
            <NextImage
                src="/logo.jpg"
                alt="Country Gardens Logo"
                fill
            />
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
