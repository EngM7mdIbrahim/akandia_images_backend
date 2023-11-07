import { IAdminDoc } from "../models/Admin/Admin";
import { IUserDoc } from "../models/User/User";

export interface PopulatedAdmin extends Omit<IAdminDoc, "uid"> {
  uid: IUserDoc;
}
