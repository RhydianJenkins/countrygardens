import '@/styles/globals.css'
import theme from '@/theme';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import Footer from './_footer';
import Header from './_header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
