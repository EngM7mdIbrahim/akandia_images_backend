import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IAdminDoc, Admin } from "../Admin";
import { PopulatedAdmin } from "../../../types/PopulatedAdmin";
import getPopulatedInstance from "./to-populated";

export default async function getAdmin(
  filterOptions: FilterQuery<IAdminDoc>
): Promise<PopulatedAdmin | null> {
  let currentAdminDoc: IAdminDoc | null;
  let populatedAdmin: PopulatedAdmin | null;
  try {
    currentAdminDoc = await Admin.findOne(filterOptions);
    if(!currentAdminDoc) return null;
    populatedAdmin = await getPopulatedInstance(currentAdminDoc);
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while getting your admin details!");
  }
  return populatedAdmin;
}
