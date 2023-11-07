import { Document, Model, Schema, model } from "mongoose";

export enum CAMPAIGN_STATUS {
PENDING="PENDING",
APPROVED="APPROVED",
REJECTED="REJECTED",
}

//TODO: 'Change attributes of the campaign here!'
export interface IInstaCampaign {
  aid: Schema.Types.ObjectId;
  title: string;
  description?: string;
  logo: string;
  visibility?: CAMPAIGN_STATUS;
  created?: Date,
  deliverables?: Schema.Types.ObjectId[];
}

//TODO: 'Change attributes of the campaign here!'
export interface IInstaCampaignDoc extends Document {
  aid: Schema.Types.ObjectId;
  title: string;
  description?: string;
  logo: string;
  visibility?: CAMPAIGN_STATUS;
  created?: Date;
  deliverables?: Schema.Types.ObjectId[];
}

interface IInstaCampaignModel extends Model<IInstaCampaignDoc> {
  build(campaign: IInstaCampaign): IInstaCampaignDoc;
}

//TODO: 'Change attributes of the campaign here!'
const instaCampaignSchema = new Schema<IInstaCampaignDoc, IInstaCampaignModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Nothing specific to describe!",
    },
    logo: {
      type: String,
      required: true,
    },

    visibility:  {
      type: String,
      enum: Object.values(CAMPAIGN_STATUS),
      default: CAMPAIGN_STATUS.PENDING,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    aid: {
      type: Schema.Types.ObjectId,
      ref: "Advertiser",
      required: true,
    },
    deliverables: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "InstaDeliverable",
        },
      ],
      default: [],
    }
  },
  {
    toJSON: {
      transform: function (_, ret) {
        ret.icid = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

instaCampaignSchema.statics.build = (campaign: IInstaCampaign) => {
  return new InstaCampaign(campaign);
};

const InstaCampaign = model("InstaCampaign", instaCampaignSchema);

export { InstaCampaign };
