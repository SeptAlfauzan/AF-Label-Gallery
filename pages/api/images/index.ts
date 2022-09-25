// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Image, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Image | Image[]>
) {
  console.log(req.body);
  switch (req.method) {
    case "POST": //validate hash
      const newImage = await prisma.image.create({
        data: req.body,
      });
      res.status(200).json(newImage);
      break;
    default:
      res.status(404);
      break;
  }
}
