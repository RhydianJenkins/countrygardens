import React from 'react';
import { Box, CircularProgress } from '@mui/material';
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
            <h2>Whoops!</h2>
            <p>Something went wrong while loading products.</p>
            <p>Please check back again later, or contact us to purchase a basket.</p>
        </Box>
    )
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
        <section id='Shop'>
            <Box sx={{
                backgroundColor: 'secondary.main',
                padding: '1em',
                paddingTop: '10em',
                textAlign: 'center',
            }}>
                <h2>Products</h2>
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
