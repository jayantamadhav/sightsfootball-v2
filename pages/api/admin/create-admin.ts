import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { UserType } from "@prisma/client";
import { hashPassword } from "../../../lib/passwordHasher";
import { response, methodNotAllowed } from "../../../lib/response";

interface IPayload {
  firstName: String;
  lastName: String;
  email: String;
  userType?: UserType;
  password: String;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const body = req.body;
      if (await prisma.user.findFirst({ where: { email: req.body.email }})) {
        res.status(200).json(response(null, 409, true, `An account with email ${req.body.email} already exists! Please try again with a different email.`))
      }
      if (
        !body.adminSecret ||
        body.adminSecret != process.env.NEXTAUTH_ADMIN_CREATE_SECRET
      ) {
        return res
          .status(401)
          .json(
            response(
              null,
              401,
              true,
              "Illegally trying to create admin account, this incident has been raised and reported."
            )
          );
      }
      const password = await hashPassword(body.password);
      const user = await prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: password,
          userType: UserType.ADMIN,
        },
      });
      if (!user) res.status(200).json(response(null, 500, true, "Something went wrong when creating your account"))
      return res.status(200).json(response(user));
    default:
      return res.status(200).json(methodNotAllowed());
  }
};
