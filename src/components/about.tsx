import { Box, Button, Grid, Typography } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import Slider from "./slider";

function Info({ router }: { router: NextRouter }) {
    const scrollToShop = async () => {
        if (window.location.pathname !== '/') {
            await router.push('/');
        }

        const element = document.getElementById('shop');

        if (element) {
            const isOnMobile = window.innerWidth <= 600;
            isOnMobile
                ? element.scrollIntoView()
                : element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            textAlign='center'
            padding='2em'
            maxWidth='50em'
            boxShadow={2}
            borderRadius={2}
            sx={{
                backgroundColor: 'primary.light',
            }}
        >
            <Typography
                variant='h3'
                component='h2'
                marginBottom='1em'
                sx={{ fontStyle: 'italic' }}
            >
                Family greengrocers since 2009
            </Typography>

            <Typography>Small, local, family run grocers serving fruit, veg, and flowers.</Typography>

            <Typography>Dedicated to buying locally when in season, or fresh from market 3 days a week so you can guarantee great produce.</Typography>

            <Button
                variant='contained'
                sx={{
                    size: 'small',
                    marginTop: '2em',
                    backgroundColor: 'secondary.main',
                }}
                onClick={scrollToShop}
            >
                Shop now
            </Button>
        </Box>
    );
}

function About() {
    const router = useRouter();

    return (
        <section id='about'>
            <Box
                sx={{
                    padding: '5em',
                    paddingTop: '10em',
                    backgroundColor: 'primary.main',
                }}
            >
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <Info router={router} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <Slider />
                    </Grid>
                </Grid>
            </Box>

        </section>
    );
}

export default About;
