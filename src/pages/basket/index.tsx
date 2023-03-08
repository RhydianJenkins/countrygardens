'use client';

import { BasketContext } from "@/hooks/useBasket";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import {
    Image as ImageIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import React from "react";
import { getProducts, ProductEntity } from "@/pages/api/products";
import { formatter } from "@/components/product";

export const getStaticProps = async () => {
    const allProducts = await getProducts();

    return {
        props: { allProducts },
        revalidate: 20,
    };
};

type BasketPageProps = {
    allProducts: ProductEntity[];
}

type BasketRowItem = {
    id: string;
    name: string;
    number: number;
    priceString: string;
}

function BasketPage({ allProducts }: BasketPageProps) {
    const { basket, addBasketItem, removeBasketItem} = React.useContext(BasketContext);
    const [basketArray, setBasketArray] = React.useState<BasketRowItem[]>([]);

    React.useEffect(() => {
        const basketArray = Object.entries(basket).map(([id, number]) => {
            const product = allProducts.find(product => product.id === id);
            const name = product?.name || '';
            const individualPrice = product?.value || 0;
            const totalPrice = number * individualPrice;
            const priceString = formatter.format(totalPrice / 100);

            return { id, name, number, priceString };
        });

        setBasketArray(basketArray);
    }, [basket]);

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
                <List sx={{ width: '100%' }}>
                    {basketArray.map(({ id, name, number, priceString }, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        borderRadius: '10px',
                                        width: '6em',
                                        height: '6em',
                                        marginRight: '3em',
                                    }}
                                >
                                    <ImageIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={number <= 1 ? name : `${name} x ${number}`}
                                secondary={priceString}
                                sx={{
                                    marginRight: '3em',
                                }}
                            />
                            <ListItemButton
                                sx={{
                                    marginLeft: '0.5em',
                                    backgroundColor: 'primary.main',
                                    borderRadius: '50%',
                                    width: '3em',
                                    height: '3em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={() => removeBasketItem(id)}
                            >
                                <RemoveIcon />
                            </ListItemButton>
                            <ListItemButton
                                sx={{
                                    marginLeft: '1em',
                                    backgroundColor: 'primary.main',
                                    borderRadius: '50%',
                                    width: '3em',
                                    height: '3em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={() => addBasketItem(id)}
                            >
                                <AddIcon />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default BasketPage;
