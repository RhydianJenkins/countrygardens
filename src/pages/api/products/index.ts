import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
}

const STRIPE_API_VERSION = '2022-11-15';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
});

export interface ProductEntity extends Stripe.Product {
    price: Stripe.Price|null;
}

export const getProducts = async (): Promise<ProductEntity[]> => {
    try {
        const { data: productData } = await stripe.products.list();
        const { data: priceData } = await stripe.prices.list();

        return productData.map((product): ProductEntity => {
            const price = priceData.find((price) => price.product === product.id) || null;

            return { ...product, price };
        }).filter((product) => product.active);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    throw new Error('Unable to retrieve products');
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
        res.end();
    }

    const products = await getProducts();

    res.status(200).json(products);
    res.end();
};

export default handler;
