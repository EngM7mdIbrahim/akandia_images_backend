import { CAMPAIGN_TYPES } from "../models/InstaDeliverable/InstaDeliverable";

export default function resolveCampaignType(campaignType: string): CAMPAIGN_TYPES {
  switch (campaignType) {
    case "Paid Campaign":
      return CAMPAIGN_TYPES.PAID_CAMPAIGN;
    case "Trade-off (Gift Campaign)":
      return CAMPAIGN_TYPES.TRADE_OFF_CAMPAIGN;
    case "Discount Campaign":
      return CAMPAIGN_TYPES.DISCOUNT_CAMPAIGN;
    case "Paid + Trade off campaign":
      return CAMPAIGN_TYPES.PAID_AND_TRADE_OFF_CAMPAIGN;
    case "Trade off + Discount Campaign":
      return CAMPAIGN_TYPES.TRADE_OFF_AND_DISCOUNT_CAMPAIGN;
    case "Paid + Trade Off + Discount Campaign":
      return CAMPAIGN_TYPES.PAID_AND_TRADE_OFF_AND_DISCOUNT_CAMPAIGN;
    default:
      return CAMPAIGN_TYPES.PAID_CAMPAIGN;
  }
}