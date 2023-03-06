import { getProducts } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export interface ProductEntity {
    name: string;
    value: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const products = await getProducts();
        return res.status(200).json(products);
    }

    return res.status(405).json({ error: 'Only GET allowed' });
};

export default handler;
