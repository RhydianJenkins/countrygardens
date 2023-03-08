import { getPocketBase } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export interface ProductEntity {
    id: string;
    name: string;
    value: number;
}

export const getProducts = async (): Promise<ProductEntity[]> => {
    const pb = getPocketBase();

    try {
        const response = await pb
            .collection('products')
            .getFullList({ sort: '-created' });

        const products = response.map(({ id, name, value }) => ({ id, name, value }));
        return products;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return [];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const products = await getProducts();
        return res.status(200).json(products);
    }

    return res.status(405).json({ error: 'Only GET allowed' });
};

export default handler;
