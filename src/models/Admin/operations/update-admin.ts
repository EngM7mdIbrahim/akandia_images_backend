import { FilterQuery } from "mongoose";
import { IAdminDoc, Admin } from "../Admin";
import { ServerError } from "../../../errors/server-error";

export default async function updateAdmin(
  filter: FilterQuery<IAdminDoc>,
  userDoc: IAdminDoc,
): Promise<void> {
  try {
    await Admin.updateOne(filter, userDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this admin!",
    );
  }
}
