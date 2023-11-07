import { ServerError } from "../../../errors/server-error";
import getUser from "../../User/operations/get-user";
import { IAdmin, IAdminDoc, Admin } from "../Admin";

interface NewAdmin extends Omit<IAdmin, "uid"> {
  uid: string;
}

export default async function newAdmin(
  user: NewAdmin
): Promise<IAdminDoc> {
  try {
    const currentUserDoc = await getUser({ _id: user.uid });
    const adminDoc = await Admin.create({
      ...user,
      uid: currentUserDoc._id,
    });
    await adminDoc.save();
    return adminDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your admin details!");
  }
}
