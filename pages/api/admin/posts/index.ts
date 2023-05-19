import prisma from "../../../../lib/prisma";
import fs from "fs";
import formidable from "formidable";
import { methodNotAllowed, response } from "../../../../lib/response";
import { NextApiRequest, NextApiResponse } from "next/types";
import { PostCategory } from "@prisma/client";
import { upload } from "../../../../lib/imagekit";
import { sanitizeFilename } from "../../../../lib/utils";

const FormidableError = formidable.errors.FormidableError;

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      multiples: false,
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

const categoryMap = {
  NEWS: PostCategory.NEWS,
  TRANSFERS: PostCategory.TRANSFERS,
  OFF_THE_PITCH: PostCategory.OFF_THE_PITCH,
  PREMIER_LEAGUE: PostCategory.PREMIER_LEAGUE,
  LA_LIGA: PostCategory.LA_LIGA,
  BUNDESLIGA: PostCategory.BUNDESLIGA,
  SERIE_A: PostCategory.SERIE_A,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const posts = await prisma.post.findMany({});
      res.status(200).json(response(posts));
      break;
    case "PATCH":
      try {
        const { fields, files } = await parseForm(req);

        // Upload the image to ImageKit and get the url
        const imageFile = files.image as formidable.File;
        const fileStream = fs.createReadStream(imageFile.filepath);
        const fileName = sanitizeFilename(imageFile.originalFilename);
        const ikResponse = await upload(fileStream, fileName);

        // Update url on the image field
        fields.image = ikResponse.url;

        // Now update the post
        const userId = fields.id as string;
        delete fields.id;
        if (fields.hasOwnProperty("category")) {
          fields.category = categoryMap[fields.category as string]
        }
        const updatedUser = await prisma.post.update({
          where: { id: userId },
          data: { ...fields },
        });
        res.status(200).json({
          data: {
            message: "Updated successfully",
          },
          error: null,
        });
      } catch (e) {
        if (e instanceof FormidableError) {
          res.status(e.httpCode || 400).json({ data: null, error: e.message });
        } else {
          res.status(500).json({ data: null, error: "Internal Server Error" });
        }
      }
      break;
    default:
      return res.status(200).json(methodNotAllowed);
  }
};

// This is so that the default parser doesn't touch our multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};
