// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ImageKit from "imagekit";
import type { NextApiRequest, NextApiResponse } from "next";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_imagekit_pub!,
  privateKey: process.env.IMAGE_KIT_PRIV!,
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  return res.status(200).json(authenticationParameters);
}
