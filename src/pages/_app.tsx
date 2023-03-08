import '@/styles/globals.css';
import theme from '@/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import useBasket, { BasketContext } from '@/hooks/useBasket';

export default function App({ Component, pageProps }: AppProps) {
    const [basket, addBasketItem, removeBasketItem] = useBasket();

    return (
        <ThemeProvider theme={theme}>
            <BasketContext.Provider value={{ basket, addBasketItem, removeBasketItem }}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </BasketContext.Provider>
        </ThemeProvider>
    );
}
