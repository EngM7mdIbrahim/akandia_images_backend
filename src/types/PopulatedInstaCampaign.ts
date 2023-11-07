import { IInstaCampaignDoc } from "../models/InstaCampaign/InstaCampaign";
import { IAdvertiserDoc } from "../models/Advertiser/Advertiser";
import { IInstaDeliverableDoc } from "../models/InstaDeliverable/InstaDeliverable";
import { IUserDoc } from "../models/User/User";

export interface PopulatedInstaCampaign extends Omit<IInstaCampaignDoc, "aid" | "deliverables"> {
  aid: IAdvertiserDoc;
  deliverables?: IInstaDeliverableDoc[];
}
