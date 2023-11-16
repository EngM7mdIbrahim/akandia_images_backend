import { IImageDataDoc, ImagesData } from "..";
import { ServerError } from "../../../errors/server-error";
import { IImageData } from "../../../types/ImageData";


export default async function newImagesData(
  imageData: IImageData
): Promise<IImageDataDoc> {
  try {
    const imageDoc = await ImagesData.create(imageData);
    await imageDoc.save();
    return imageDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your image!");
  }
}
