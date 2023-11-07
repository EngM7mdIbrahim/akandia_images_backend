import { ServerError } from "../../../errors/server-error";
import { PopulatedAdvertiser } from "../../../types/PopulatedAdvertiser";
import { IAdvertiserDoc } from "../Advertiser";

export default async function getPopulatedInstance(
  advertiser: IAdvertiserDoc
): Promise<PopulatedAdvertiser> {
  try {
    return await advertiser.populate<PopulatedAdvertiser>({
      path: "uid",
      model: "User",
    });
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while populating your details!");
  }
}
