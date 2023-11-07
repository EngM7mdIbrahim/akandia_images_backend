import { Document, Model, Schema, model } from "mongoose";

//TODO: 'Change attributes of the user here!'
export interface IAdvertiser {
  uid: Schema.Types.ObjectId;
  name: string;
  designation: string;
  industry: string;
  visibility?: boolean;
  created?: Date
}

//TODO: 'Change attributes of the user here!'
export interface IAdvertiserDoc extends Document {
  uid: Schema.Types.ObjectId;
  name: string;
  designation: string;
  industry: string;
  visibility?: boolean;
  created?: Date
}

interface IAdvertiserModel extends Model<IAdvertiserDoc> {
  build(user: IAdvertiser): IAdvertiserDoc;
}

//TODO: 'Change attributes of the user here!'
const advertiserSchema = new Schema<IAdvertiserDoc, IAdvertiserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    created: {
      type: Date,
      default: Date.now(),
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
        ret.aid = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

advertiserSchema.statics.build = (user: IAdvertiser) => {
  return new Advertiser(user);
};

const Advertiser = model("Advertiser", advertiserSchema);

export { Advertiser };
