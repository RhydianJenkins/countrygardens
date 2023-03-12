import { NextApiRequest, NextApiResponse } from "next";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).end('Hello world!');
}

export default handler;
