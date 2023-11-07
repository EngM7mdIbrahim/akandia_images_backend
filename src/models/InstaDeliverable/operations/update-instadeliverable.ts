import { FilterQuery } from "mongoose";
import { IInstaDeliverableDoc, InstaDeliverable } from "../InstaDeliverable";
import { ServerError } from "../../../errors/server-error";

export default async function updateInstaDeliverable(
  filter: FilterQuery<IInstaDeliverableDoc>,
  userDoc: IInstaDeliverableDoc,
): Promise<void> {
  try {
    await InstaDeliverable.updateOne(filter, userDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this deliverable!",
    );
  }
}
