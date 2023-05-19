import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../lib/prisma";
import { methodNotAllowed, response } from "../../../../lib/response";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "GET":
      const users = await prisma.user.findMany({});
      return res.status(200).json(response(users));
    default:
      return res.status(200).json(methodNotAllowed);
  }
};
