import { Request, Response, Router } from "express";
import { ROUTES } from "../../../constants/routes";
import { currentUser } from "../../../middlewares/current-user";
import requireAuth from "../../../middlewares/require-auth";
import { currentAdmin } from "../../../middlewares/admin/current-admin";
import requireGetAllCampaigns from "../../../middlewares/admin/scopes/require-get-all-campaigns";
import getInstaCampaigns from "../../../models/InstaCampaign/operations/get-all-instacampaigns";

const route = Router();

route.get(
  ROUTES.ADMINS.GET_ALL_CAMPAIGNS,
  currentUser,
  requireAuth,
  currentAdmin,
  requireGetAllCampaigns,
  async (req: Request, res: Response) => {
    const instaCampaigns = await getInstaCampaigns({});
    return res.status(200).send({ instaCampaigns });
  }
);

export { route as getAllCampaignsRouter };
