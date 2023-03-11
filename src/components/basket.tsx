import NextLink from 'next/link';
import { formatter } from "@/components/product";
import { ProductEntity } from '@/pages/api/products';
import { Box, Typography, Divider, Paper, List } from '@mui/material';
import { BasketContext } from '@/hooks/useBasket';
import React from 'react';
import BasketListItem, { BasketListItemProps } from './basketListItem';

type BasketPageProps = {
    allProducts: ProductEntity[];
    totalPrice: string;
}

function EmptyBasketState() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            alignItems: 'center',
        }}>
            <Typography variant='h2' textAlign='center'>Empty Basket</Typography>
            <Box sx={{
                minHeight: 'calc(100vh - 33.25em)',
                padding: '1em',
                flexGrow: 1,
            }}>
                <NextLink href='/'>(Go Home)</NextLink>
            </Box>
        </Box>
    );
}

function Basket({ allProducts, totalPrice }: BasketPageProps) {
    const { basket, addBasketItem, removeBasketItem } = React.useContext(BasketContext);
    const [basketArray, setBasketArray] = React.useState<BasketListItemProps[]>([]);

    React.useEffect(() => {
        const basketArray: BasketListItemProps[] = [];

        Object.entries(basket).forEach(([id, number]) => {
            const product = allProducts.find(product => product.id === id);

            if (!product) {
                // eslint-disable-next-line no-console
                console.log(`Product ${id} not found. Removing from basket.`);
                removeBasketItem(id, 999);
                return;
            }

            const name = product?.name || '';
            const imageUrl = product?.imageUrl || null;

            const individualPrice = product?.value || 0;
            const priceString = formatter.format(individualPrice / 100);

            const totalPrice = number * individualPrice;
            const totalPriceString = formatter.format(totalPrice / 100);

            const newBasketItem = {
                id,
                name,
                number,
                individualPrice,
                totalPrice,
                priceString,
                totalPriceString,
                imageUrl,
                onAdd: addBasketItem,
                onRemove: removeBasketItem,
            };

            basketArray.push(newBasketItem);
        });

        setBasketArray(basketArray);
    }, [basket]);

    if (basketArray.length === 0) {
        return <EmptyBasketState />;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='h2'>Basket</Typography>
            <Box sx={{
                minHeight: 'calc(100vh - 40em)',
                padding: '1em',
                flexGrow: 1,
            }}>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <List
                        sx={{
                            borderRadius: '5px 5px 0 0',
                            width: '100%',
                        }}
                    >
                        {basketArray.map((rowItem, key) => (
                            <span key={key}>
                                { key > 0 && <Divider variant="middle" />}
                                <BasketListItem {...rowItem} />
                            </span>
                        ))}
                    </List>
                </Paper>
                <Typography variant='subtitle1' textAlign='center' margin='5em'>Subtotal: {totalPrice}</Typography>
            </Box>
        </Box>
    );
}

export default Basket;
