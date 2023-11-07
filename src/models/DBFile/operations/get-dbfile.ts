import { FilterQuery } from "mongoose";
import { ServerError } from "../../../errors/server-error";
import { IDBFileDoc, DBFile } from "../DBFile";
import { BadRequestError } from "../../../errors/bad-request-error";

export default async function getDBFile(filterOptions: FilterQuery<IDBFileDoc>): Promise<IDBFileDoc>{
  let currentDBFileDoc: IDBFileDoc | null;
  try{
    currentDBFileDoc = await DBFile.findOne(filterOptions)
  }catch(e: any){
    console.error(e.message)
    throw new ServerError('Something went wrong while getting your details!')
  }
  ;
  if (!currentDBFileDoc) {
    throw new BadRequestError(
      "No file found!"
    );
  };
  return currentDBFileDoc
}