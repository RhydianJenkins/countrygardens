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

type AlertSnackbarProps = {
    lastAddedProduct: string;
    open: boolean;
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

function AlertSnackbar({ lastAddedProduct, open, handleClose }: AlertSnackbarProps) {
    return (
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
    );
}

type ImageComponentProps = {
    imageUrl: string;
    alt: string;
}

function ImageComponent({ imageUrl, alt }: ImageComponentProps) {
    return (
        <Box
            sx={{
                flexGrow: 1,
                height: '20em',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <NextImage
                src={imageUrl}
                alt={alt}
                width={320}
                height={320}
                style={{ objectFit: "cover" }}
            />
        </Box>
    );
}

function Product({ id, name, price, description, images }: ProductEntity) {
    const { addBasketItem } = React.useContext(BasketContext);
    const [open, setOpen] = React.useState(false);
    const [lastAddedProduct, setLastAddedProduct] = React.useState('');
    const [addedToCart, setAddedToCart] = React.useState(false);

    const unitAmount = price?.unit_amount || 0;
    const currency = price?.currency;
    const imageUrl = images[0] ?? '';
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
            <AlertSnackbar
                lastAddedProduct={lastAddedProduct}
                open={open}
                handleClose={handleClose}
            />

            <Paper
                elevation={3}
                sx={{
                    width: '20em',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {imageUrl && <ImageComponent imageUrl={imageUrl} alt={name} />}
                {description && <Box
                    sx={{
                        padding: '1em',
                        backgroundColor: 'primary.main',
                        textAlign: 'center',
                    }}>
                    <Typography>{description}</Typography>
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
                        <Typography variant='subtitle1'>{name}</Typography>
                        <Typography variant='subtitle2'>{priceString}</Typography>
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

export default Product;
