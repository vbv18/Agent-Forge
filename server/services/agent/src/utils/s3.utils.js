import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

export async function uploadToS3(fileName, buffer, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: buffer,
      Key: fileName,
      ContentType: contentType,
    }),
  );

  return fileName;
}

export async function getFromS3(fileName, expiresIn = 60) {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    }),
    {
      expiresIn,
    },
  );
}
