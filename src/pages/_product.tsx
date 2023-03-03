import { Paper } from '@mui/material';

export interface ProductProps {
    name: string;
    value: number;
}

export default function Product({ name, value }: ProductProps) {
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
