import NextImage from 'next/image';
import { Box, Typography } from '@mui/material';

function Info() {
    return (
        <Box sx={{
            minWidth: '20em',
            minHeight: '10em',
            position: 'relative',
            padding: '2em',
            textAlign: 'center',
            borderRadius: '8px',
            backgroundColor: 'primary.main',
        }}>
            <Typography variant="h1" component="h1">Country Gardens</Typography>
            <Typography variant="h2" component="h2">Greengrocer</Typography>
        </Box>
    );
}

function Wave() {
    return (
        <Box sx={{
            width: '100%',
            backgroundColor: 'red',
            position: 'relative',
        }}>
            <svg viewBox="0 0 100 100">
                <path d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0" fill="blue"></path>
                <path d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0" fill="green" opacity="0.8"></path>
                <path d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0" fill="red" opacity="0.5"></path>
            </svg>
        </Box>
    );
}

export default function Cover() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100vw',
            minHeight: '40em',
            maxHeight: '80vh',
            spacing: 0,
            justify: 'space-around',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <NextImage
                fill
                src={'/img/cover.jpeg'}
                alt={'Country Gardens'}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                }}
            />
            <Info />
        </Box>
    );
}
