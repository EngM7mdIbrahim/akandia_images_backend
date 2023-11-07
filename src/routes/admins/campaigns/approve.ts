import { Request, Response, Router } from "express";
import { ROUTES } from "../../../constants/routes";
import { body } from "express-validator";
import validationCheck from "../../../middlewares/validation-check";
import { BadRequestError } from "../../../errors/bad-request-error";
import { currentUser } from "../../../middlewares/current-user";
import requireAuth from "../../../middlewares/require-auth";
import {
  CAMPAIGN_STATUS,
} from "../../../models/InstaCampaign/InstaCampaign";
import { currentAdmin } from "../../../middlewares/admin/current-admin";
import requireAdmin from "../../../middlewares/admin/require-admin";
import requireApproveCampaigns from "../../../middlewares/admin/scopes/require-approve-campaigns";
import getInstaCampaign from "../../../models/InstaCampaign/operations/get-instacampaign";

const route = Router();

route.post(
  ROUTES.ADMINS.APPROVE_CAMPAIGN,
  currentUser,
  requireAuth,
  currentAdmin,
  requireAdmin,
  requireApproveCampaigns,
  [body("key").exists().withMessage("Which campaign do you want!")],
  validationCheck,
  async (req: Request, res: Response) => {
    const { key } = req.body;
    const currCampaign = await getInstaCampaign({ _id: key });
    if (!currCampaign) throw new BadRequestError("No such campaign exists!");
    currCampaign.visibility = CAMPAIGN_STATUS.APPROVED;
    await currCampaign.save();
    return res.status(201).send({ campaign: currCampaign });
  }
);

export { route as approveInstaCampaignRouter };
