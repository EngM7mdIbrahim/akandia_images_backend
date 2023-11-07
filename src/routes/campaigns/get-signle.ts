import { Request, Response, Router } from "express";
import { ROUTES } from "../../constants/routes";
import validationCheck from "../../middlewares/validation-check";
import { currentUser } from "../../middlewares/current-user";
import { currentAdvertiser } from "../../middlewares/current-advertiser";
import requireAuth from "../../middlewares/require-auth";
import requireAdvertiser from "../../middlewares/require-advertiser";
import getSingleInstaCampaignSharedRouter from "../shared/campaigns/get-single-insta-campaign";

const route = Router();

route.get(
  ROUTES.CAMPAIGNS.GET_SINGLE,
  currentUser,
  requireAuth,
  validationCheck,
  currentAdvertiser,
  requireAdvertiser,
  async (req: Request, res: Response) => {
    await getSingleInstaCampaignSharedRouter(req, res);
  }
);

export { route as getSingleInstaCampaignRouter };
