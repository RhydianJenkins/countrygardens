import { NextApiRequest, NextApiResponse } from "next";

export interface ProductEntity {
    name: string;
    value: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        // TODO fetch(env.POCKETBASE_URL/LOCALHOST/api/products)...
        const products = [
            { name: "Product 1", value: 69 },
            { name: "Product 2", value: 420 },
        ] as ProductEntity[];
        return res.status(200).json(products);
    }

    return res.status(405).json({ error: 'Only GET allowed' });
};

export default handler;
