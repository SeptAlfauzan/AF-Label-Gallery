// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateHash, validateHash } from "../../../lib/auth";

type Data = {
  name: string;
};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[]>
) {
  switch (req.method) {
    case "POST": //validate hash
      const { username, password } = req.body;
      const hashedPassword = await generateHash(10, password);
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(200).json(user);
      break;
    default:
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      break;
  }
}
