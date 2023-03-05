import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product as ProductEntity } from '@/database';
import Product from './product';

export interface ProductsProps {
    products?: ProductEntity[];
}

function Products({ products }: ProductsProps) {
    return (
        <section id='shop'>
            <Box sx={{
                backgroundColor: 'secondary.main',
                padding: '1em',
                paddingTop: '10em',
                textAlign: 'center',
            }}>
                <Typography variant="h3">Products</Typography>
            </Box>

            <Box sx={{
                backgroundColor: 'secondary.main',
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

export default Products;
