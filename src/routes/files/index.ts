import { Express } from "express";
import { uploadFileRouter } from "./upload-file";
import { issueURLRouter } from "./issue-url";

export default function fileBinder(app: Express) {
  app.use(uploadFileRouter);
  app.use(issueURLRouter)
}
