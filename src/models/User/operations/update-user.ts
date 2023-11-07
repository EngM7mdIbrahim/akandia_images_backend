import { FilterQuery } from "mongoose";
import { IUserDoc, User } from "../User";
import { ServerError } from "../../../errors/server-error";

export default async function updateUser(
  filter: FilterQuery<IUserDoc>,
  userDoc: IUserDoc,
): Promise<void> {
  try {
    await User.updateOne(filter, userDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this user!",
    );
  }
}
