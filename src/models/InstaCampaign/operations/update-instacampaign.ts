import { FilterQuery, UpdateQuery } from "mongoose";
import { IInstaCampaignDoc, InstaCampaign } from "../InstaCampaign";
import { ServerError } from "../../../errors/server-error";
import { UpdateWithAggregationPipeline } from "mongoose";

export default async function updateInstaCampaign(
  filter: FilterQuery<IInstaCampaignDoc>,
  userDoc: UpdateQuery<IInstaCampaignDoc> | UpdateWithAggregationPipeline | undefined,
): Promise<void> {
  try {
    await InstaCampaign.updateOne(filter, userDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this campaign!",
    );
  }
}
