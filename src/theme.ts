import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { CSSObject } from '@emotion/react';

export const globalStyles = {
    ['*']: {
        padding: 0,
        margin: 0,
    },
    body: {
        backgroundColor: '#F9F7F1',
        maxWidth: '100vw',
        overflowX: 'hidden',
    },
    a: {
        textDecoration: 'none',
        color: 'inherit',
        boxSizing: 'border-box',
    },
} as CSSObject;

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
    palette: {
        background: {
            paper: '#FAFAFA',
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
