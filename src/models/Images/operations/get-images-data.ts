import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IImageDataDoc, ImagesData } from "..";

export default async function getImagesData(
  filterOptions: FilterQuery<IImageDataDoc>
): Promise<IImageDataDoc[] | null> {
  let currentImagesDataDoc: IImageDataDoc[];
  try {
    currentImagesDataDoc = await ImagesData.find(filterOptions);
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your deliverable!");
  }
  return currentImagesDataDoc;
}
