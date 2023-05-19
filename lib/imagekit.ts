import ImageKit from "imagekit";
import fs from "fs";
import { FileObject, UploadResponse } from "imagekit/dist/libs/interfaces";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.NEXT_IMAGEKIT_SECRET_KEY,
  urlEndpoint: process.env.NEXT_IMAGEKIT_URL,
});

export const upload = async (
  image: fs.ReadStream,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    imagekit
      .upload({
        file: image,
        fileName: fileName,
        folder: process.env.NEXT_IMAGEKIT_UPLOAD_FOLDER,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchQuery = async (name: string): Promise<FileObject[]> => {
  return new Promise((resolve, reject) => {
    imagekit.listFiles(
      {
        searchQuery: `name="${name}"`,
        path: process.env.NEXT_IMAGEKIT_UPLOAD_FOLDER,
      },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
