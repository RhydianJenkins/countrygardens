import NextImage from 'next/image';
import { Box, Typography } from '@mui/material';

function Info() {
    return (
        <Box sx={{
            position: 'relative',
            padding: '2em',
            textAlign: 'center',
            borderRadius: '8px',
            backgroundColor: 'primary.main',
        }}>
            <Typography variant="h1" component="h1">Country Gardens</Typography>
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
                src={'/img/oranges.jpg'}
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
