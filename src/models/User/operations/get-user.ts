import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IUserDoc, User } from "../User";
import { BadRequestError } from "../../../errors/bad-request-error";

export default async function getUser(filterOptions: FilterQuery<IUserDoc>): Promise<IUserDoc>{
  let currentUserDoc: IUserDoc | null;
  try{
    currentUserDoc = await User.findOne(filterOptions)
  }catch(e: any){
    console.error(e.message)
    throw new ServerError('Something went wrong while getting your details!')
  }
  ;
  if (!currentUserDoc) {
    throw new BadRequestError(
      "You didn't signup before! Please sign up first!"
    );
  };
  return currentUserDoc
}