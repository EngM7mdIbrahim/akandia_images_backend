import { Upload } from "@aws-sdk/lib-storage";
import { getS3Client } from "./aws";
import { ServerError } from "../errors/server-error";

export default async function uploadFileToS3(file: any, fileKey: string, mimeType: string){
  const s3 = getS3Client();
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_S3_UPLOAD_BUCKET,
      Key: fileKey,
      Body: file,
      ContentType: mimeType,
    },
  });

  upload.on("httpUploadProgress", (progress) => {
    console.log("Current Progress: ", progress);
  });

  try {
    await upload.done();
  } catch (err) {
    throw new ServerError("Something went wrong while uploading your file!")
    console.log(err);
  }
}