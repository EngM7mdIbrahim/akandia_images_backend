import { Document, Model, Schema, model } from "mongoose";

export enum CAMPAIGN_TYPES {
  PAID_CAMPAIGN = "PAID_CAMPAIGN",
  TRADE_OFF_CAMPAIGN = "TRADE_OFF_CAMPAIGN",
  DISCOUNT_CAMPAIGN = "DISCOUNT_CAMPAIGN",
  PAID_AND_TRADE_OFF_CAMPAIGN = "PAID_AND_TRADE_OFF_CAMPAIGN",
  TRADE_OFF_AND_DISCOUNT_CAMPAIGN = "TRADE_OFF_AND_DISCOUNT_CAMPAIGN",
  PAID_AND_TRADE_OFF_AND_DISCOUNT_CAMPAIGN = "PAID_AND_TRADE_OFF_AND_DISCOUNT_CAMPAIGN",
}

//TODO: 'Change attributes of the campaign here!'
export interface IInstaDeliverable {
  minFollowers: number;
  maxFollowers: number;
  storyCount?: number;
  campaign: CAMPAIGN_TYPES;
  imagePostCount?: number;
  videoPostCount?: number;
  linkInBioDuration?: number;
  extraValues?: {
    collaborationPrice?: number;
    discountPrice?: number;
    productValue?: number;
  };
}

//TODO: 'Change attributes of the campaign here!'
export interface IInstaDeliverableDoc extends Document {
  minFollowers: number;
  maxFollowers: number;
  campaign: CAMPAIGN_TYPES;
  storyCount?: number;
  imagePostCount?: number;
  videoPostCount?: number;
  linkInBioDuration?: number;
  extraValues?: {
    collaborationPrice?: number;
    discountPrice?: number;
    productValue?: number;
  };
}

interface IInstaDeliverableModel extends Model<IInstaDeliverableDoc> {
  build(deliverable: IInstaDeliverable): IInstaDeliverableDoc;
}

//TODO: 'Change attributes of the campaign here!'
const instaDeliverableSchema = new Schema<
  IInstaDeliverableDoc,
  IInstaDeliverableModel
>(
  {
    campaign:{
      type: String,
      enum: Object.values(CAMPAIGN_TYPES),
      required: true,
    },
    minFollowers: {
      type: Number,
      required: true,
    },
    maxFollowers: {
      type: Number,
      required: true,
    },
    storyCount: {
      type: Number,
      default: 0,
    },
    imagePostCount: {
      type: Number,
      default: 0,
    },
    videoPostCount: {
      type: Number,
      default: 0,
    },
    linkInBioDuration: {
      type: Number,
      default: 0,
    },
    extraValues: {
      collaborationPrice: {
        type: Number,
        default: 0,
      },
      discountPrice: {
        type: Number,
        default: 0,
      },
      productValue: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    toJSON: {
      transform: function (_, ret) {
        ret.did = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

instaDeliverableSchema.statics.build = (deliverable: IInstaDeliverable) => {
  return new InstaDeliverable(deliverable);
};

const InstaDeliverable = model("InstaDeliverable", instaDeliverableSchema);

export { InstaDeliverable };
