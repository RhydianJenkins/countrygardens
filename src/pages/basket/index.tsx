'use client';

import { Box } from "@mui/material";

function BasketPage() {
    const basket = [
        { id: 1, name: 'Product 1', price: 'Lots!' },
        { id: 2, name: 'Product 2', price: 'Lots!' },
        { id: 3, name: 'Product 3', price: 'Lots!' },
        { id: 4, name: 'Product 4', price: 'Lots!' },
        { id: 5, name: 'Product 5', price: 'Lots!' },
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10em',
            alignItems: 'center',
        }}>
            <h1>Basket</h1>
            <Box sx={{
                minHeight: 'calc(100vh - 22em)',
                padding: '1em',
                flexGrow: 1,
            }}>
                <ul>
                    {basket.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price}
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}

export default BasketPage;
