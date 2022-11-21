// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { importPKCS8, SignJWT } from "jose";
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
      console.log(isValid);

      if (isValid) {
        const algorithm = "ES256";
        const pkcs8 = `-----BEGIN PRIVATE KEY-----
        MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgiyvo0X+VQ0yIrOaN
        nlrnUclopnvuuMfoc8HHly3505OhRANCAAQWUcdZ8uTSAsFuwtNy4KtsKqgeqYxg
        l6kwL5D4N3pEGYGIDjV69Sw0zAt43480WqJv7HCL0mQnyqFmSrxj8jMa
        -----END PRIVATE KEY-----`;
        const ecPrivateKey = await importPKCS8(pkcs8, algorithm);
        console.log(ecPrivateKey);

        const jwt = await new SignJWT({ "urn:example:claim": true })
          .setProtectedHeader({ alg: "ES256" })
          .sign(ecPrivateKey);

        console.log(jwt);

        res.setHeader(
          "set-cookie",
          `yourParameter=${jwt}; path=/; samesite=lax; httponly;`
        );
      }
      return res.status(200).json(isValid);
      break;
    default: //test generate hash
      console.log(await generateHash(10, req.query.plain!.toString()));
      res.status(200).json({ name: "John Doe" });
      break;
  }
}
