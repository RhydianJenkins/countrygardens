import { ProductEntity } from '@/pages/api/products';
import { Alert, Box, Button, Paper, Snackbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import NextImage from 'next/image';
import { BasketContext } from '@/hooks/useBasket';

export const formatUnitAmount = (unitAmount: number, currency = 'GBP') => {
    const formatter = new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency,
    });

    return formatter.format(unitAmount / 100);
};

export default function Product({ id, name, price }: ProductEntity) {
    const { addBasketItem } = React.useContext(BasketContext);
    const [open, setOpen] = React.useState(false);
    const [lastAddedProduct, setLastAddedProduct] = React.useState('');
    const [addedToCart, setAddedToCart] = React.useState(false);

    const unitAmount = price?.unit_amount || 0;
    const currency = price?.currency;
    const imageUrl = ''; // TODO
    const priceString = formatUnitAmount(unitAmount, currency);

    const addProductToCart = ({ id, name }: { id: string, name: string }) => {
        setLastAddedProduct(name);
        addBasketItem(id);
        setOpen(true);
        setAddedToCart(true);
    };

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
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
                    action={
                        <Button variant="outlined" color='success' size='small'>
                            <NextLink href='/checkout'>View Basket</NextLink>
                        </Button>
                    }
                >
                    {`${lastAddedProduct} added to basket. `}
                </Alert>
            </Snackbar>

            <Paper
                elevation={3}
                sx={{
                    width: '20em',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {imageUrl && <Box
                    sx={{
                        flexGrow: 1,
                        height: '20em',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <NextImage
                        src={imageUrl}
                        alt={name}
                        width={320}
                        height={320}
                        style={{ objectFit:"cover" }}
                    />
                </Box>}
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
