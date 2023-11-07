import { ServerError } from "../../../errors/server-error";
import { IInstaDeliverableDoc, InstaDeliverable } from "../InstaDeliverable";
import { IInstaDeliverable } from "../InstaDeliverable";

export default async function newInstaDeliverable(
  deliverable: IInstaDeliverable
): Promise<IInstaDeliverableDoc> {
  try {
    const deliverableDoc = await InstaDeliverable.create(deliverable);
    await deliverableDoc.save();
    return deliverableDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your deliverable!");
  }
}
