import * as jwt from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest, NextFetchEvent } from "next/server";
import routes from "../../lib/routes";

const getToken = async (req: NextRequest) => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  const token = req.cookies["next-auth.session-token"]
  return jwt.decode({ token, secret });
};

export default async (request: NextRequest, event: NextFetchEvent) => {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const protectedPaths = ["/api/admin"];
  const isPathProtected = protectedPaths?.some((path) =>
    pathname.startsWith(path)
  );
  if (isPathProtected) {
    const token = await getToken(request);
    if (!token) {
      const url = new URL(routes.ADMIN_LOGIN, request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
};
