import PocketBase from 'pocketbase';

const defaultAddress = 'http://127.0.0.1:8090';
if (!process.env.POCKETBASE_API_ADDRESS) {
    // eslint-disable-next-line no-console
    console.warn('POCKETBASE_API_ADDRESS env not set. Using default address: ', defaultAddress);
}

let pb: PocketBase | null = null;
export const getPocketBase = (): PocketBase => {
    if (!pb) {
        pb = new PocketBase(process.env.POCKETBASE_API_ADDRESS || defaultAddress);
    }

    return pb;
};
