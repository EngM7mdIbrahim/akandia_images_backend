import { FilterQuery } from "mongoose";
import { IAdvertiserDoc, Advertiser } from "../Advertiser";
import { ServerError } from "../../../errors/server-error";

export default async function updateAdvertiser(
  filter: FilterQuery<IAdvertiserDoc>,
  userDoc: IAdvertiserDoc,
): Promise<void> {
  try {
    await Advertiser.updateOne(filter, userDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this user!",
    );
  }
}
