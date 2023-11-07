import { Express } from "express";
import { createInstaCampaignRouter } from "./create";
import { getSingleInstaCampaignRouter } from "./get-signle";
import { updateInstaCampaignRouter } from "./update";

export default function campaignBinder(app: Express) {
  app.use(createInstaCampaignRouter);
  app.use(updateInstaCampaignRouter);
  app.use(getSingleInstaCampaignRouter);
}
