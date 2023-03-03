import React from 'react';
import { Box } from '@mui/material';
import Product from './_product';
import { Order } from '@/database';

function Products() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useMemo(() => {
        setLoading(true);

        fetch('/api/orders')
            .then((res) => res.json())
            .then((orders) => setOrders(orders))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something went wrong...</h1>;
    }

    console.log(orders);

    return (
        <Box sx={{
            width: '80vw',
            backgroundColor: 'secondary.main',
            margin: 'auto',
            padding: '128px',
            display: 'flex',
            gap: '32px',
        }}>
            {orders.map((order, index) =>
                <Product
                    key={index}
                    name={order.name}
                    value={order.value}
                />
            )}
        </Box>
    );
}

export default Products;
