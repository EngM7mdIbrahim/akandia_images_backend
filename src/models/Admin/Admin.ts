import { Document, Model, Schema, model } from "mongoose";

export enum ADMIN_SCOPES {
  SUPER_ADMIN = "SUPER_ADMIN",
  GET_ALL_CAMPAIGNS = "GET_ALL_CAMPAIGNS",
  GET_SINGLE_CAMPAIGN = "GET_SINGLE_CAMPAIGN",
  APPROVE_CAMPAIGNS = "APPROVE_CAMPAIGNS",
  REJECT_CAMPAIGNS = "REJECT_CAMPAIGNS",
  EDIT_CAMPAIGNS = "EDIT_CAMPAIGNS",
}

//TODO: 'Change attributes of the user here!'
export interface IAdmin {
  uid: Schema.Types.ObjectId;
  name: string;
  scopes: ADMIN_SCOPES[];
  created?: Date
}

//TODO: 'Change attributes of the user here!'
export interface IAdminDoc extends Document {
  uid: Schema.Types.ObjectId;
  name: string;
  scopes: ADMIN_SCOPES[];
  created?: Date
}

interface IAdminModel extends Model<IAdminDoc> {
  build(admin: IAdmin): IAdminDoc;
}

//TODO: 'Change attributes of the user here!'
const adminSchema = new Schema<IAdminDoc, IAdminModel>(
  {
    name: {
      type: String,
      required: true,
    },
    scopes: {
      type: [String],
      enum: Object.values(ADMIN_SCOPES),
      required: true,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (_, ret) {
        ret.adid = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

adminSchema.statics.build = (user: IAdmin) => {
  return new Admin(user);
};

const Admin = model("Admin", adminSchema);

export { Admin };
