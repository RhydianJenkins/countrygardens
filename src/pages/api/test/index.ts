import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'Hello, world' });
    res.end();
};

export default handler;
