import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }

  interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string | null;
    id?: string;
    userType?: String;
  }

  interface CredentialsType {
    email?: string;
    password?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: String;
    email?: String;
    userType: String;
    exp?: number;
    iat?: number;
    jti?: String;
  }
}
