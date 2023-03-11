import NextLink from 'next/link';
import { formatter } from "@/components/product";
import { ProductEntity } from '@/pages/api/products';
import { Button as MuiButton, Box, Typography, Divider, Paper, List } from '@mui/material';
import { BasketContext } from '@/hooks/useBasket';
import React from 'react';
import BasketListItem, { BasketListItemProps } from './basketListItem';

type BasketPageProps = {
    allProducts: ProductEntity[];
}

function EmptyBasketState() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10em',
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

function Basket({ allProducts }: BasketPageProps) {
    const { basket, addBasketItem, removeBasketItem } = React.useContext(BasketContext);
    const [basketArray, setBasketArray] = React.useState<BasketListItemProps[]>([]);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);

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

        const newTotalBasketCost = basketArray.reduce((acc, cur) => {
            return acc + cur.totalPrice;
        }, 0);

        setBasketArray(basketArray);
        setTotalBasketCost(newTotalBasketCost);
    }, [basket]);

    if (basketArray.length === 0) {
        return <EmptyBasketState />;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10em',
            alignItems: 'center',
        }}>
            <Typography variant='h2'>Basket</Typography>
            <Box sx={{
                minHeight: 'calc(100vh - 22em)',
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

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        marginTop: '5em',
                        gap: '3em',
                    }}
                >
                    <Typography variant="subtitle1">{formatter.format(totalBasketCost / 100)}</Typography>
                    <MuiButton
                        variant="contained"
                        disabled={totalBasketCost <= 0}
                        onClick={() => alert('Checkout coming soon!')}
                        sx={{
                            backgroundColor: 'secondary.main',
                        }}
                    >
                        <Typography>Checkout</Typography>
                    </MuiButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Basket;
