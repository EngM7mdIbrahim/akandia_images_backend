import { ServerError } from "../../../errors/server-error";
import getUser from "../../User/operations/get-user";
import { IDBFile, IDBFileDoc, DBFile } from "../DBFile";

interface IFilePar extends Omit<IDBFile, "uid"> {
  uid: string;
}

export default async function newDBFile(file: IFilePar): Promise<IDBFileDoc> {
  try {
    const currentUser = await getUser({ _id: file.uid });
    const DBFileDoc = await DBFile.create({ ...file, uid: currentUser._id });
    await DBFileDoc.save();
    return DBFileDoc;
  } catch (e: any) {
    console.error(e.message);
    throw new ServerError("Something went wrong while saving your details!");
  }
}
