import { Paper } from '@mui/material';

export interface ProductProps {
    name: string;
    price: number;
}

export default function Product({ name, price }: ProductProps) {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '256px',
                minHeight: '256px',
                padding: '16px',
                backgroundColor: 'tertiary.main',
            }}
        >
            {name}
        </Paper>
    );
}
