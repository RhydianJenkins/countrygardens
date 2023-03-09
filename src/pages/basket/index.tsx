import { AddBasketItemType, BasketContext, RemoveBasketItemType } from "@/hooks/useBasket";
import {
    Avatar,
    Box,
    Button as MuiButton,
    ButtonGroup,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography,
    Paper,
    Grid,
    Divider,
} from "@mui/material";
import {
    Image as ImageIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import React from "react";
import NextLink from 'next/link';
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
    individualPrice: number;
    priceString: string;
    totalPriceString: string;
    onAdd: AddBasketItemType;
    onRemove: RemoveBasketItemType;
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
            <h1>Empty Basket</h1>
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

function BasketListItem({ id, name, number, priceString, totalPriceString, onRemove, onAdd }: BasketRowItem) {
    return (
        <ListItem>
            <Grid container spacing={2}>
                <Grid item sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1,
                }}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                borderRadius: '10px',
                                width: '6em',
                                height: '6em',
                                marginRight: '1em',
                            }}
                        >
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={name}
                        secondary={priceString}
                    />
                </Grid>

                <Grid item sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}>
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
                                onClick={() => onRemove(id)}
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
                                onClick={() => onAdd(id)}
                            >
                                <AddIcon />
                            </ListItemButton>
                        </Tooltip>

                        <Box component="span" sx={{ margin: '1em', width: '3em' }}>{totalPriceString}</Box>

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
                                onClick={() => onRemove(id, 9999)}
                            >
                                <DeleteIcon />
                            </ListItemButton>
                        </Tooltip>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </ListItem>
    );
}

function BasketPage({ allProducts }: BasketPageProps) {
    const { basket, addBasketItem, removeBasketItem } = React.useContext(BasketContext);
    const [basketArray, setBasketArray] = React.useState<BasketRowItem[]>([]);
    const [totalBasketCost, setTotalBasketCost] = React.useState(0);

    React.useEffect(() => {
        const basketArray = Object.entries(basket).map(([id, number]) => {
            const product = allProducts.find(product => product.id === id);
            const name = product?.name || '';

            const individualPrice = product?.value || 0;
            const priceString = formatter.format(individualPrice / 100);

            const totalPrice = number * individualPrice;
            const totalPriceString = formatter.format(totalPrice / 100);

            return {
                id,
                name,
                number,
                individualPrice,
                totalPrice,
                priceString,
                totalPriceString,
                onAdd: addBasketItem,
                onRemove: removeBasketItem,
            };
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
            <h1>Basket</h1>
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
                                { key > 0 && <Divider />}
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
                        Checkout
                    </MuiButton>
                </Box>
            </Box>
        </Box>
    );
}

export default BasketPage;
