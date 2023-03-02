import { collections, get, Order, post } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const orders = await get(collections.orders);
    res.status(200).end(JSON.stringify(orders));
  }

  if (req.method === "POST") {
    const newOrder: Order = {
      value: 421,
      timestamp: new Date().toISOString(),
      name: "Test",
    };
    const createdOrder = await post(collections.orders, newOrder);
    const response = {
      id: createdOrder.id,
    }

    res.status(201).end(JSON.stringify(response));
  }

  res.status(400).end('GET or POST allowed');
}

export default handler;
