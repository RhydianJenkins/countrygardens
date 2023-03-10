import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
    palette: {
        background: {
            default: '#E3DA7',
            paper: '#E3DA7',
        },
        primary: {
            main: '#B2C460',
        },
        secondary: {
            main: '#FCAB54',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
