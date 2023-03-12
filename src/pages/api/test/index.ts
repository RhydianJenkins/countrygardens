import { VercelRequest, VercelResponse } from "@vercel/node";

const handler = async (_req: VercelRequest, res: VercelResponse) => {
    return res.status(200).json({ message: `Hello world!` });
};

export default handler;
