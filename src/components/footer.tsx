import { Box } from '@mui/material';
import { Facebook } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{
            width: '80vw',
            backgroundColor: 'secondary.main',
            margin: 'auto',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <a href="https://www.facebook.com/CountryGardensSelsey" target="_blank">
                <Facebook />
            </a>
        </Box>
    );
}
