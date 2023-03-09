import { ProductEntity } from '@/pages/api/products';
import { Link as MuiLink, Alert, Box, Button, Paper, Snackbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import Image from 'next/image';
import { BasketContext } from '@/hooks/useBasket';

export const formatter = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'GBP',
});

export default function Product({ id, name, value }: ProductEntity) {
    const { addBasketItem } = React.useContext(BasketContext);
    const [open, setOpen] = React.useState(false);
    const [lastAddedProduct, setLastAddedProduct] = React.useState('');
    const [addedToCart, setAddedToCart] = React.useState(false);

    const priceString = formatter.format(value / 100);

    const addProductToCart = ({ id, name }: { id: string, name: string }) => {
        setLastAddedProduct(name);
        addBasketItem(id);
        setOpen(true);
        setAddedToCart(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar
                key={lastAddedProduct}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                >
                    {`${lastAddedProduct} added to basket. `}
                    <NextLink href='/basket'>
                        <MuiLink component='span' underline='hover'>View basket</MuiLink>
                    </NextLink>
                </Alert>
            </Snackbar>

            <Paper
                elevation={3}
                sx={{
                    width: '20em',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        height: '20em',
                        borderRadius: '5px 5px 0 0',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Image
                        fill
                        src="/img/orange_placeholder.jpg"
                        alt="placeholder"
                        sizes='100vw'
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        height: '5em',
                        justifyContent: 'space-between',
                        padding: '1em',
                        backgroundColor: 'primary.main',
                    }}
                >
                    <span>
                        <Typography>{name}</Typography>
                        <Typography>{priceString}</Typography>
                    </span>
                    <Button
                        variant='contained'
                        disabled={addedToCart}
                        sx={{
                            size: 'small',
                            backgroundColor: 'secondary.main',
                        }}
                        onClick={() => addProductToCart({ id, name })}
                    >
                        {addedToCart ? 'Added' : 'Add to cart'}
                    </Button>
                </Box>
            </Paper>
        </>
    );
}
