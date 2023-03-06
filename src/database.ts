import PocketBase from 'pocketbase';
import { ProductEntity } from './pages/api/products';

const defaultAddress = 'http://127.0.0.1:8090';

if (!process.env.POCKETBASE_API_ADDRESS) {
    // eslint-disable-next-line no-console
    console.warn('POCKETBASE_API_ADDRESS env not set. Using default address: ', defaultAddress);
}

const pb = new PocketBase(process.env.POCKETBASE_API_ADDRESS || defaultAddress);

export const getProducts = async (): Promise<ProductEntity[]> => {
    const response = await pb
        .collection('products')
        .getFullList({ sort: '-created' });

    const products = response.map(({ name, value }) => ({ name, value }));

    return products;
};
