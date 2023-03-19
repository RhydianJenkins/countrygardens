import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
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
            paper: '#F9F7F1',
        },
        primary: {
            main: '#F4ECE0',
        },
        secondary: {
            main: '#53A548',
        },
        common: {
            black: '#000000',
        },
        error: {
            main: '#E4572E',
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
