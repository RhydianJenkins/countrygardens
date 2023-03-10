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
            paper: '#E3DA7',
        },
        primary: {
            main: '#F9F7F1',
        },
        secondary: {
            main: '#FCAB54',
        },
        common: {
            black: '#000000',
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
