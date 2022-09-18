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
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST": //validate hash
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: { username },
      });
      console.log(user);
      console.log(
        await validateHash(
          password,
          "$2b$10$F9WKUUuuzrNZaLTnwvFaIeUqEta/QoOHCeXu5ysk1NX2n6lXOiFwC"
        )
      );
      break;
    default: //test generate hash
      console.log(await generateHash(10, req.query.plain!.toString()));
      break;
  }
  res.status(200).json({ name: "John Doe" });
}
