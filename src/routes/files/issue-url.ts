import express, { Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { ROUTES } from "../../constants/routes";
import requireAuth from "../../middlewares/require-auth";
import validationCheck from "../../middlewares/validation-check";
import { body } from "express-validator";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getDBFile from "../../models/DBFile/operations/get-dbfile";
import { getS3Client } from "../../utils/aws";

const router = express.Router();
const expiresIn = 60 * 60 * 24 * 7; // 7 days

router.post(
  ROUTES.FILES.ISSUE_URL,
  currentUser,
  requireAuth,
  [body("key").isString().withMessage("Key is required!")],
  validationCheck,
  async (req: Request, res: Response) => {
    const { key } = req.body;
    await getDBFile({ key });
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_UPLOAD_BUCKET,
      Key: key,
    });
    const s3 = getS3Client();
    const url = await getSignedUrl(s3, command, {
      expiresIn,
    });
    res.status(200).send({ url, expiresIn });
  }
);

export { router as issueURLRouter };
