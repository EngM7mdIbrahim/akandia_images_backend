import { Request, Response, Router } from "express";
import { ROUTES } from "../../../constants/routes";
import { currentUser } from "../../../middlewares/current-user";
import requireAuth from "../../../middlewares/require-auth";
import { currentAdmin } from "../../../middlewares/admin/current-admin";
import requireGetAllCampaigns from "../../../middlewares/admin/scopes/require-get-all-campaigns";
import getInstaCampaigns from "../../../models/InstaCampaign/operations/get-all-instacampaigns";
import getSingleInstaCampaignSharedRouter from "../../shared/campaigns/get-single-insta-campaign";
import requireGetSingleCampaign from "../../../middlewares/admin/scopes/require-get-single-campaign";

const route = Router();

route.get(
  ROUTES.ADMINS.GET_SINGLE_CAMPAIGN,
  currentUser,
  requireAuth,
  currentAdmin,
  requireGetSingleCampaign,
  async (req: Request, res: Response) => {
    return await getSingleInstaCampaignSharedRouter(req, res);
  }
);

export { route as getSingleInstaCampaignRouter };
