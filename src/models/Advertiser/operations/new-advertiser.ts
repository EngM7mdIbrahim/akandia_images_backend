import { ServerError } from "../../../errors/server-error";
import getUser from "../../User/operations/get-user";
import { IAdvertiser, IAdvertiserDoc, Advertiser } from "../Advertiser";

interface NewAdvertiser extends Omit<IAdvertiser, "uid"> {
  uid: string;
}

export default async function newAdvertiser(
  user: NewAdvertiser
): Promise<IAdvertiserDoc> {
  try {
    const currentUserDoc = await getUser({ _id: user.uid });
    const advDoc = await Advertiser.create({
      ...user,
      uid: currentUserDoc._id,
    });
    await advDoc.save();
    return advDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your details!");
  }
}
