// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[]>
) {
  switch (req.method) {
    case "POST": //validate hash
      req.body.price = Number(req.body.price);
      const newProduct = await prisma.product.create({
        data: req.body,
      });
      res.status(200).json(newProduct);
      break;
    default:
      const products = await prisma.product.findMany({
        include: { images: true },
      });
      res.status(200).json(products);
      break;
  }
}
