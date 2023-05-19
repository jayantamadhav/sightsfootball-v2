import { NextApiRequest, NextApiResponse } from "next/types";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, CredentialsType } from "next-auth";
import * as jwt from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { comparePassword } from "../../../lib/passwordHasher";
import routes from "../../../lib/routes";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "sightsfootball",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: CredentialsType, req: NextApiRequest) {
        const user = await prisma.user.findUnique({
          where: { email: req.body.email },
        });
        if (user) {
          const passwordVerified = await comparePassword(
            credentials.password,
            user.password
          );
          if (passwordVerified) {
            return user;
          }
        } else {
          throw new Error("Wrong credentials. Try again.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routes.ADMIN_LOGIN,
    signOut: routes.ADMIN_LOGOUT,
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      user && (token.user = user);
      if (account) {
        console.log(account.id_token);
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
});
