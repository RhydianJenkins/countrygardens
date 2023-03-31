import theme, { globalStyles } from '@/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import useBasket, { BasketContext } from '@/hooks/useBasket';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Head from 'next/head';
import PageLoadIndicator from '@/components/pageLoadIndicator';

export default function App({ Component, pageProps }: AppProps) {
    const [basket, addBasketItem, removeBasketItem, clearBasket] = useBasket();

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Country Gardens</title>
                <meta property="og:title" content="Country Gardens" key="title" />
                <meta name="description" content="Local green grocers based in Selsey Chichister" />
                <meta name="keywords" content="fruit, veg, shop, ecommerce, country, gardens, selsey, chichister, box" />
            </Head>
            <CssBaseline/>
            <GlobalStyles styles={globalStyles} />
            <BasketContext.Provider value={{ basket, addBasketItem, removeBasketItem, clearBasket }}>
                <PageLoadIndicator />
                <Header />
                <Component {...pageProps} />
                <Footer />
            </BasketContext.Provider>
        </ThemeProvider>
    );
}
