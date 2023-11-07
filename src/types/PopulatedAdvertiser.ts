import { IAdvertiserDoc } from "../models/Advertiser/Advertiser";
import { IUserDoc } from "../models/User/User";

export interface PopulatedAdvertiser extends Omit<IAdvertiserDoc, "uid"> {
  uid: IUserDoc;
}
