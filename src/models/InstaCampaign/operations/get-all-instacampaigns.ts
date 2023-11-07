import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IInstaCampaignDoc, InstaCampaign } from "../InstaCampaign";
import { PopulatedInstaCampaign } from "../../../types/PopulatedInstaCampaign";
import getPopulatedInstance from "./to-populated";

export default async function getInstaCampaigns(
  filterOptions: FilterQuery<IInstaCampaignDoc>
): Promise<PopulatedInstaCampaign[]> {
  let currentInstaCampaignDocs: IInstaCampaignDoc[] | null;
  let populatedInstaCampaigns: PopulatedInstaCampaign[] | null;
  try {
    currentInstaCampaignDocs = await InstaCampaign.find(filterOptions);
    populatedInstaCampaigns = await Promise.all(
      currentInstaCampaignDocs.map(async (instaCampaignDoc) => {
        return await getPopulatedInstance(instaCampaignDoc);
      })
    );
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your details!");
  }
  return populatedInstaCampaigns;
}
