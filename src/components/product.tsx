import { ProductEntity } from '@/pages/api/products';
import { Paper, Typography } from '@mui/material';

export default function Product({ name, value }: ProductEntity) {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '15em',
                minHeight: '15em',
                padding: '1em',
            }}
        >
            <Typography>Name: {name}</Typography>
            <Typography>Value: {value}</Typography>
        </Paper>
    );
}
