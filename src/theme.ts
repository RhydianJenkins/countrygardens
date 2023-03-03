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
            default: '#D8DBE2',
            paper: '#58A4B0',
        },
        primary: {
            main: '#A9BCD0',
            dark: '#1B1B1E',
        },
        secondary: {
            main: '#58A4B0',
            dark: '#1B1B1E',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
