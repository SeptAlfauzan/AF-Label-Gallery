import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  importPKCS8,
  SignJWT,
  jwtVerify as jwtVerif,
  type JWTPayload,
  importSPKI,
} from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allCookies = request.cookies;
  const token: string | undefined = allCookies.get("authToken");

  const algorithm = "ES256";
  const spki = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEFlHHWfLk0gLBbsLTcuCrbCqoHqmM
YJepMC+Q+Dd6RBmBiA41evUsNMwLeN+PNFqib+xwi9JkJ8qhZkq8Y/IzGg==
-----END PUBLIC KEY-----`;

  const ecPublicKey = await importSPKI(spki, algorithm);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    // const { payload } = await jwtVerif(token!, ecPublicKey);
    // if (token) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerif(token!, ecPublicKey);
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/collections", request.url));
  }

  if (!token)
    return NextResponse.redirect(new URL("/collections", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/auth"],
};
function jwtVerify(
  jwt: any,
  publicKey: any,
  arg2: { issuer: string; audience: string }
):
  | { payload: any; protectedHeader: any }
  | PromiseLike<{ payload: any; protectedHeader: any }> {
  throw new Error("Function not implemented.");
}
