import ImageKit from "imagekit-javascript";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_imagekit_pub,
  urlEndpoint: "https://ik.imagekit.io/ed7h05d2n/",
  authenticationEndpoint: "http://localhost:3000/api/imagekit/",
});
