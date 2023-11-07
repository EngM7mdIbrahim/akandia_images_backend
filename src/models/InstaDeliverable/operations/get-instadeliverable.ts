import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IInstaDeliverableDoc, InstaDeliverable } from "../InstaDeliverable";

export default async function getInstaDeliverable(
  filterOptions: FilterQuery<IInstaDeliverableDoc>
): Promise<IInstaDeliverableDoc | null> {
  let currentInstaDeliverableDoc: IInstaDeliverableDoc | null;
  try {
    currentInstaDeliverableDoc = await InstaDeliverable.findOne(filterOptions);
    if(!currentInstaDeliverableDoc) return null;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your deliverable!");
  }
  return currentInstaDeliverableDoc;
}
