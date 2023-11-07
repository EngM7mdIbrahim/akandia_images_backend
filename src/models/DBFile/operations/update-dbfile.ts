import { FilterQuery } from "mongoose";
import { IDBFileDoc, DBFile } from "../DBFile";
import { ServerError } from "../../../errors/server-error";

export default async function updateDBFile(
  filter: FilterQuery<IDBFileDoc>,
  fileDoc: IDBFileDoc,
): Promise<void> {
  try {
    await DBFile.updateOne(filter, fileDoc).exec();
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError(
      "Something went wrong while updating this file!",
    );
  }
}
