import { Box } from '@mui/material';
import Product from './_product';

export default function Products() {
    return (
        <Box sx={{
            width: '80vw',
            backgroundColor: 'secondary.main',
            margin: 'auto',
            padding: '128px',
        }}>
            <Product
                name='Product 1'
                price={123}
            />
        </Box>
    );
}
