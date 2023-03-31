import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

function PageLoadIndicator() {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            const pageLoader = document.getElementById("pageLoader");

            if (!pageLoader) {
                return;
            }

            pageLoader.style.display = "block";
        };

        const handleRouteComplete = () => {
            const pageLoader = document.getElementById("pageLoader");

            if (!pageLoader) {
                return;
            }

            pageLoader.style.display = "none";
        };

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <Box id='pageLoader' sx={{
            width: '100vw',
            position: 'fixed',
            top: 0,
            zIndex: 9999,
            display: 'hidden',
        }}>
            <LinearProgress color='secondary' />
        </Box>
    );
}

export default PageLoadIndicator;
