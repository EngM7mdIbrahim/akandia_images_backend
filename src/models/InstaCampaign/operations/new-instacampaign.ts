import { ServerError } from "../../../errors/server-error";
import getAdvertiser from "../../Advertiser/operations/get-advertiser";
import { IInstaDeliverable } from "../../InstaDeliverable/InstaDeliverable";
import newInstaDeliverable from "../../InstaDeliverable/operations/new-instadeliverable";
import {
  IInstaCampaign,
  IInstaCampaignDoc,
  InstaCampaign,
} from "../InstaCampaign";

interface NewInstaCampaign
  extends Omit<IInstaCampaign, "aid" | "deliverables"> {
  aid: string;
  deliverables?: IInstaDeliverable[];
}

export default async function newInstaCampaign(
  user: NewInstaCampaign
): Promise<IInstaCampaignDoc> {
  try {
    const currentAdvertiserDoc = await getAdvertiser({ _id: user.aid });
    if (!currentAdvertiserDoc) {
      throw new ServerError("Advertiser not found!");
    }
    const deliverableDocs = user.deliverables
      ? await Promise.all(user.deliverables.map(async (deliverable) => {
        return await newInstaDeliverable(deliverable);
      }))
      : [];
    const campDoc = await InstaCampaign.create({
      ...user,
      aid: currentAdvertiserDoc._id,
      deliverables: deliverableDocs.map((deliverable) => deliverable._id),
    });
    await campDoc.save();
    return campDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your details!");
  }
}
