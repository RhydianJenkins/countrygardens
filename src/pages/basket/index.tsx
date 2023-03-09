import { BasketContext } from "@/hooks/useBasket";
import { Avatar, Box, ButtonGroup, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import {
    Image as ImageIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
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
                                primary={name}
                                secondary={priceString}
                                sx={{
                                    marginRight: '3em',
                                }}
                            />

                            <ButtonGroup
                                disableElevation
                                aria-label="Controls for number of items in basket"
                                variant="contained"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.75em',
                                }}
                            >
                                <Tooltip title="Remove one">
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            borderRadius: '50%',
                                            width: '2em',
                                            height: '2em',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => removeBasketItem(id)}
                                    >
                                        <RemoveIcon />
                                    </ListItemButton>
                                </Tooltip>

                                <Box component="span" sx={{ width: '1em', textAlign: 'center' }}>{number}</Box>

                                <Tooltip title="Add one">
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            borderRadius: '50%',
                                            width: '2em',
                                            height: '2em',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => addBasketItem(id)}
                                    >
                                        <AddIcon />
                                    </ListItemButton>
                                </Tooltip>

                                <Tooltip title={`Remove all ${name} from basket`}>
                                    <ListItemButton
                                        sx={{
                                            marginLeft: '2em',
                                            borderRadius: '50%',
                                            width: '2em',
                                            height: '2em',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => removeBasketItem(id, 9999)}
                                    >
                                        <DeleteIcon />
                                    </ListItemButton>
                                </Tooltip>
                            </ButtonGroup>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default BasketPage;
