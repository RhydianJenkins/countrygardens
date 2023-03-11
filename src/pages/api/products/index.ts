import { getPocketBase } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import Client, { Record } from "pocketbase";

export interface ProductEntity {
    id: string;
    name: string;
    value: number;
    imageUrl: string|null;
}

export const getProducts = async (): Promise<ProductEntity[]> => {
    const pb = getPocketBase();

    try {
        const response = await pb
            .collection('products')
            .getFullList({ sort: '-created' });

        const products = response.map((product) => ({
            id: product.id,
            name: product.name,
            value: product.value,
            imageUrl: getProductImageUrl(pb, product),
        }));

        return products;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return [];
};

const getProductImageUrl = (pb: Client, product: Record): string|null => {
    if (!product.image) {
        return null;
    }

    const url = pb.getFileUrl(product, product.image);

    return url;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
        return;
    }

    const products = await getProducts();
    return res.status(200).json(products);
};

export default handler;
