import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { createSecretKey } from "crypto";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET": //validate hash
      const secret = new TextEncoder().encode(process.env.secret_key!);
      res.status(200).json(secret);
      break;
  }
}
