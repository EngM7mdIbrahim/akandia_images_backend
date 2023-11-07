import { ServerError } from "../../../errors/server-error";
import { PopulatedAdmin } from "../../../types/PopulatedAdmin";
import { IAdminDoc } from "../Admin";

export default async function getPopulatedInstance(
  admin: IAdminDoc
): Promise<PopulatedAdmin> {
  try {
    return await admin.populate<PopulatedAdmin>({
      path: "uid",
      model: "User",
    });
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while populating your admin details!");
  }
}
