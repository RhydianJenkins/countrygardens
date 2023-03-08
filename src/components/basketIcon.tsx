import { Badge } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import NextLink from 'next/link';
import { BasketContext } from '@/hooks/useBasket';

const BasketIcon = () => {
    const { basket } = React.useContext(BasketContext);
    const [basketCount, setBasketCount] = React.useState(0);

    React.useEffect(() => {
        const basketCount = Object.keys(basket).reduce((acc, key) => acc + basket[key], 0);
        setBasketCount(basketCount);
    }, [basket]);

    return (
        <NextLink href='/basket'>
            <Tooltip title="Go to Basket">
                <Badge color="secondary" badgeContent={basketCount}>
                    <ShoppingBasket />
                </Badge>
            </Tooltip>
        </NextLink>
    );
};

export default BasketIcon;
