import { Box } from '@mui/material';
import { Facebook } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{
            width: '100vw',
            backgroundColor: 'secondary.main',
            margin: 'auto',
            padding: '1em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10em',
        }}>
            <a href="https://www.facebook.com/CountryGardensSelsey" target="_blank">
                <Facebook />
            </a>
        </Box>
    );
}
