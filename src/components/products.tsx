import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Product as ProductEntity } from '@/database';
import Product from './product';

function LoadingComponent() {
    return (
        <Box sx={{
            backgroundColor: 'secondary.main',
            padding: '5em',
            textAlign: 'center',
        }}>
            <CircularProgress />
        </Box>
    );
}

function ErrorComponent() {
    return (
        <Box
            sx={{
                color: 'white',
                textAlign: 'center',
                padding: '1em',
            }}
        >
            <Typography variant="subtitle1">Whoops!</Typography>
            <Typography variant="body1">Something went wrong while loading products.</Typography>
            <Typography variant="body1">Please check back again later, or contact us to purchase a basket.</Typography>
        </Box>
    );
}

function Products() {
    const [products, setProducts] = React.useState<ProductEntity[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useMemo(() => {
        setLoading(true);

        fetch('/api/products')
            .then((res) => res.json())
            .then((products) => setProducts(products))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

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
                {loading && <LoadingComponent />}
                {error ? <ErrorComponent /> : products.map((product, index) =>
                    <Product
                        key={index}
                        {...product}
                    />
                )}
            </Box>
        </section>
    );
}

export default Products;
