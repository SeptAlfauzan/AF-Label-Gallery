// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateHash, validateHash } from "../../../lib/auth";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | boolean>
) {
  switch (req.method) {
    case "POST": //validate hash
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (!user) return res.status(404);
      const isValid = await validateHash(password, user?.password);
      return res.status(200).json(isValid);
      break;
    default: //test generate hash
      console.log(await generateHash(10, req.query.plain!.toString()));
      res.status(200).json({ name: "John Doe" });
      break;
  }
}
