import { createSecretKey } from "crypto";
import * as jose from "jose";

export const getSecretKey = (): Uint8Array =>
  new TextEncoder().encode(`secret`);

export const signJWT = async (arg: string): Promise<string> => {
  try {
    const jwt = await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(getSecretKey());
    return Promise.resolve(jwt);
  } catch (error) {
    return Promise.reject(error);
  }
};
