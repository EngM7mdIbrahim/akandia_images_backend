import { Express } from "express";
import { adminSignUpRouter } from "./signup";
import { getAllCampaignsRouter } from "./campaigns/get-all";
import { currentAdminRouter } from "./current-user";
import { approveInstaCampaignRouter } from "./campaigns/approve";
import { rejectInstaCampaignRouter } from "./campaigns/reject";
import { updateInstaCampaignRouter } from "./campaigns/update";
import { getSingleInstaCampaignRouter } from "./campaigns/get-single-campaign";

export default function adminBinder(app: Express) {
  app.use(adminSignUpRouter);
  app.use(currentAdminRouter);
  app.use(getAllCampaignsRouter);
  app.use(approveInstaCampaignRouter);
  app.use(rejectInstaCampaignRouter);
  app.use(updateInstaCampaignRouter);
  app.use(getSingleInstaCampaignRouter);
}
