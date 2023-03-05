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
        <section id='Products'>
            <Box sx={{
                backgroundColor: 'secondary.main',
                padding: '16px',
                paddingTop: '128px',
                textAlign: 'center',
            }}>
                <h1>Products</h1>
            </Box>

            <Box sx={{
                backgroundColor: 'secondary.main',
                margin: 'auto',
                gap: '16px',
                padding: '16px',
                paddingBottom: '128px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {products.map((product, index) =>
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
