import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Product as ProductEntity } from '@/database';
import Product from './product';

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

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return <h1>Something went wrong...</h1>;
    }

    return (
        <Box sx={{
            width: '80vw',
            backgroundColor: 'secondary.main',
            margin: 'auto',
            padding: '128px',
            display: 'flex',
            gap: '32px',
        }}>
            {products.map((product, index) =>
                <Product
                    key={index}
                    name={product.name}
                    value={product.value}
                />
            )}
        </Box>
    );
}

export default Products;
