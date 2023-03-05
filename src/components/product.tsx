import { Paper } from '@mui/material';
import { Product as ProductEntity } from '@/database';

export default function Product({ name, value }: ProductEntity) {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '256px',
                minHeight: '256px',
                padding: '16px',
            }}
        >
            <p>Name: {name}</p>
            <p>Value: {value}</p>
        </Paper>
    );
}
