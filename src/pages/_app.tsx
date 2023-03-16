import theme, { globalStyles } from '@/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import useBasket, { BasketContext } from '@/hooks/useBasket';
import { GlobalStyles } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
    const [basket, addBasketItem, removeBasketItem, clearBasket] = useBasket();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={globalStyles} />
            <BasketContext.Provider value={{ basket, addBasketItem, removeBasketItem, clearBasket }}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </BasketContext.Provider>
        </ThemeProvider>
    );
}
