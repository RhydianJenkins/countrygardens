'use client';

import { Badge, IconButton } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import useBasket from '@/hooks/useBasket';
import NextLink from 'next/link';

function BasketIcon() {
    const [basket] = useBasket();
    const [basketCount, setBasketCount] = React.useState(0);

    const handleOpenBasket = () => {
        // eslint-disable-next-line no-console
        console.log('TODO navigate to basket');
    };

    React.useEffect(() => {
        const newCount = Object.keys({ ...basket }).reduce((acc, key) => acc + basket[key], 0);
        setBasketCount(newCount);
    }, [Object.values(basket)]);

    return (
        <NextLink href='/basket'>
            <Tooltip title="Go to Basket">
                <IconButton onClick={handleOpenBasket} sx={{ p: 0 }}>
                    <Badge color="secondary" badgeContent={basketCount}>
                        <ShoppingBasket />
                    </Badge>
                </IconButton>
            </Tooltip>
        </NextLink>
    );
}

export default BasketIcon;
