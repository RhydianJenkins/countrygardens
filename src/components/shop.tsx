import React from 'react';
import { Box, Typography } from '@mui/material';
import Product from './product';
import { ProductEntity } from '@/pages/api/products';

export interface ShopProps {
    products: ProductEntity[];
}

function Shop({ products }: ShopProps) {
    return (
        <section id='shop'>
            <Box sx={{
                padding: '1em',
                paddingTop: '10em',
                textAlign: 'center',
            }}>
                <Typography variant="h3">Shop</Typography>
            </Box>

            <Box sx={{
                margin: 'auto',
                gap: '16px',
                padding: '1em',
                paddingBottom: '5em',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {products?.length
                    ? products.map((product, index) => <Product key={index} {...product} />)
                    : <Typography variant="caption">Nothing here at the moment. Check back later.</Typography>}
            </Box>
        </section>
    );
}

export default Shop;
