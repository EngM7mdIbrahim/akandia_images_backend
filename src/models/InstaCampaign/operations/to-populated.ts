import { ServerError } from "../../../errors/server-error";
import { PopulatedInstaCampaign } from "../../../types/PopulatedInstaCampaign";
import { IInstaCampaignDoc } from "../InstaCampaign";

export default async function getPopulatedInstance(
  InstaCampaign: IInstaCampaignDoc
): Promise<PopulatedInstaCampaign> {
  try {
    return await InstaCampaign.populate<PopulatedInstaCampaign>([
      {
        path: "deliverables",
        model: "InstaDeliverable",
      },
      {
        path: "aid",
        model: "Advertiser",
      },
      {
        path: "aid.uid",
        model: "User",
      }
    ]);
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while populating your details!"
    );
  }
}
