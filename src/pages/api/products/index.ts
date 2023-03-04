import { collections, get } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const orders = await get(collections.products);
        res.status(200).json(orders);
    }

    res.status(405).json({ error: 'GET allowed' });
}

export default handler;
