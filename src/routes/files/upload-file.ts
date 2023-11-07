import express, { NextFunction, Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { ROUTES } from "../../constants/routes";
import requireAuth from "../../middlewares/require-auth";
import busboy from "busboy";
import newDBFile from "../../models/DBFile/operations/new-dbfile";
import uploadFileToS3 from "../../utils/upload-file-to-s3";
import generateFileKey from "../../utils/generate-file-key";
import updateDBFile from "../../models/DBFile/operations/update-dbfile";

const router = express.Router();

router.post(
  ROUTES.FILES.UPLOAD,
  currentUser,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const bb = busboy({ headers: req.headers });
    let fileKey = "";
    bb.on("file", async (_, file, info) => {
      try {
        const { filename, mimeType } = info;
        const currDBFile = await newDBFile({
          name: filename,
          uid: req.currentUser!.uid,
        });
        fileKey = generateFileKey(currDBFile._id, filename);
        currDBFile.key = fileKey;
        await updateDBFile({ _id: currDBFile._id }, currDBFile);
        let uploadedData = 0;
        file.on("data", (data) => {
          uploadedData += data.length;
          console.log(
            `File upload in progress: ${
              (uploadedData / Number(req.headers["content-length"])) * 100
            }% uploaded!`
          );
        });
        file.on("end", () => {
          console.log("File upload completed!");
        });
        await uploadFileToS3(file, fileKey, mimeType);
        console.log("File uploaded successfully!");
      } catch (err: any) {
        req.unpipe();
        bb.removeAllListeners();
        return next(err);
      }
    });
    bb.on("close", () => {
      res.status(201).send({ key: fileKey });
    });
    req.pipe(bb);
  }
);

export { router as uploadFileRouter };
