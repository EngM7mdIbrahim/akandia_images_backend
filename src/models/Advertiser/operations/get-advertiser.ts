import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IAdvertiserDoc, Advertiser } from "../Advertiser";
import { PopulatedAdvertiser } from "../../../types/PopulatedAdvertiser";
import getPopulatedInstance from "./to-populated";

export default async function getAdvertiser(
  filterOptions: FilterQuery<IAdvertiserDoc>
): Promise<PopulatedAdvertiser | null> {
  let currentAdvertiserDoc: IAdvertiserDoc | null;
  let populatedAdvertiser: PopulatedAdvertiser | null;
  try {
    currentAdvertiserDoc = await Advertiser.findOne(filterOptions);
    if(!currentAdvertiserDoc) return null;
    populatedAdvertiser = await getPopulatedInstance(currentAdvertiserDoc);
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your details!");
  }
  return populatedAdvertiser;
}
