import { Document, Model, Schema, model } from "mongoose";

//TODO: 'Change attributes of the DBFile here!'
export interface IDBFile {
  name: string;
  uid: Schema.Types.ObjectId;
  key?: string;
}

//TODO: 'Change attributes of the DBFile here!'
export interface IDBFileDoc extends Document {
  name: string;
  uid: Schema.Types.ObjectId;
  key?: string;
}

interface IDBFileModel extends Model<IDBFileDoc> {
  build(DBFile: IDBFile): IDBFileDoc;
}

//TODO: 'Change attributes of the DBFile here!'
const DBFileSchema = new Schema<IDBFileDoc, IDBFileModel>(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      default: "",
    }
  },
  {
    toJSON: {
      transform: function (_, ret) {
        ret.fid = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.iat;
      },
    },
  }
);

DBFileSchema.statics.build = (file: IDBFile) => {
  return new DBFile(file);
};

const DBFile = model("DBFile", DBFileSchema);

export { DBFile };
