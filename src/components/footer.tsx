import { Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import NextLink from 'next/link';

export default function Footer() {
    return (
        <Box sx={{
            width: '100vw',
            backgroundColor: 'primary.main',
            margin: 'auto',
            padding: '1em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10em',
        }}>
            <NextLink href="https://www.facebook.com/CountryGardensSelsey" target="_blank">
                <FacebookIcon />
            </NextLink>
        </Box>
    );
}
