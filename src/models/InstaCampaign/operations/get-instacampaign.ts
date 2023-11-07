import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IInstaCampaignDoc, InstaCampaign } from "../InstaCampaign";
import { PopulatedInstaCampaign } from "../../../types/PopulatedInstaCampaign";
import getPopulatedInstance from "./to-populated";

export default async function getInstaCampaign(
  filterOptions: FilterQuery<IInstaCampaignDoc>
): Promise<PopulatedInstaCampaign | null> {
  let currentInstaCampaignDoc: IInstaCampaignDoc | null;
  let populatedInstaCampaign: PopulatedInstaCampaign | null;
  try {
    currentInstaCampaignDoc = await InstaCampaign.findOne(filterOptions);
    if(!currentInstaCampaignDoc) return null;
    populatedInstaCampaign = await getPopulatedInstance(currentInstaCampaignDoc);
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your details!");
  }
  return populatedInstaCampaign;
}
