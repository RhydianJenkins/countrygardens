import { AddBasketItemType, RemoveBasketItemType } from "@/hooks/useBasket";
import { Avatar, Box, ButtonGroup, Grid, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import NextImage from 'next/image';

export type BasketListItemProps = {
    id: string;
    name: string;
    number: number;
    individualPrice: number;
    totalPrice: number;
    priceString: string;
    totalPriceString: string;
    imageUrl: string|null;
    onAdd: AddBasketItemType;
    onRemove: RemoveBasketItemType;
}

function BasketListItem({
    id,
    name,
    number,
    priceString,
    totalPriceString,
    imageUrl,
    onRemove,
    onAdd,
}: BasketListItemProps) {
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
                                position: 'relative',
                            }}
                        >
                            {imageUrl ?
                                <NextImage
                                    src={imageUrl}
                                    alt={name}
                                    width={120}
                                    height={120}
                                    style={{ objectFit: "cover" }}
                                />
                                : <ImageIcon />
                            }
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
                        <Typography sx={{
                            display: { md: 'inherit', sm: 'none', xs: 'none' },
                        }}>
                            &times;
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { md: 'column-reverse', sm: 'row' },
                                gap: '0.5em',
                                alignItems: 'center',
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

                            <Box component="span" sx={{ width: '1em', textAlign: 'center' }}>
                                <Typography>{number}</Typography>
                            </Box>

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
                        </Box>

                        <Typography>=</Typography>

                        <Box component="span" sx={{ margin: '1em', width: '3em' }}>
                            <Typography>{totalPriceString}</Typography>
                        </Box>

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

export default BasketListItem;
