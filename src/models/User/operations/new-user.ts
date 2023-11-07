import { ServerError } from "../../../errors/server-error";
import { IUser, IUserDoc, User } from "../User";

export default async function newUser(user: IUser): Promise<IUserDoc>{
  try{
    const userDoc = await User.create(user);
    await userDoc.save();
    return userDoc;
  } catch (e: any) {
    console.error(e.message)
    throw new ServerError('Something went wrong while saving your details!');
  }
}