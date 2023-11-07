import { Request, Response, Router } from "express";
import { ROUTES } from "../../constants/routes";
import { body } from "express-validator";
import validationCheck from "../../middlewares/validation-check";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import { currentAdvertiser } from "../../middlewares/current-advertiser";
import requireAuth from "../../middlewares/require-auth";
import newInstaCampaign from "../../models/InstaCampaign/operations/new-instacampaign";
import validateFileKeyPath from "../../utils/validate-file-key";
import getDBFile from "../../models/DBFile/operations/get-dbfile";
import { IInstaDeliverable } from "../../models/InstaDeliverable/InstaDeliverable";
import {
  FOLLOWERS_RANGE,
  CAMPAIGN_TYPES_FRONT_END_LIST,
} from "../../constants/arrays";
import resolveToNumber from "../../utils/resolve-followers-to-number";
import resolveCampaignType from "../../utils/resolve-campaign-type";
import requireAdvertiser from "../../middlewares/require-advertiser";

const route = Router();

route.post(
  ROUTES.CAMPAIGNS.CREATE,
  currentUser,
  requireAuth,
  [
    body("uploadALogo")
      .isString()
      .withMessage("Logo key is required!")
      .custom((val) => {
        return validateFileKeyPath(val);
      })
      .withMessage("Enter a valid logo key!"),
    body("description")
      .optional()
      .isString()
      .withMessage("Please enter a valid description!"),
    body("title").isString().withMessage("Please enter a valid title!"),
    body("deliverables")
      .optional()
      .isArray()
      .withMessage("Please enter valid deliverables!")
      .custom((deliverables: IInstaDeliverable[]) => {
        if (!Array.isArray(deliverables))
          throw new Error("Deliverables should be an array!");
        deliverables.forEach((deliverable, i) => {
          if (!deliverable.campaign)
            throw new Error(
              `Deliverable ${i + 1} should have a campaign type!`
            );
          if (!CAMPAIGN_TYPES_FRONT_END_LIST.includes(deliverable.campaign)) {
            console.log("deliverable.campaign", deliverable.campaign);
            throw new Error(
              `Deliverable ${i + 1} should have a valid campaign type!`
            );
          }

          if (!deliverable.minFollowers)
            throw new Error(
              `Deliverable ${i + 1} should have a minimum number of followers!`
            );
          if (!deliverable.maxFollowers)
            throw new Error(
              `Deliverable ${i + 1} should have a maximum number of followers!`
            );
          //@ts-ignore
          if (!FOLLOWERS_RANGE.includes(deliverable.minFollowers)) {
            throw new Error(
              `Deliverable ${i + 1} should have a valid minimum followers!`
            );
          }
          //@ts-ignore
          if (!FOLLOWERS_RANGE.includes(deliverable.maxFollowers)) {
            throw new Error(
              `Deliverable ${i + 1} should have a valid maximum followers!`
            );
          }
          //@ts-ignore
          const minFollowersNumber = resolveToNumber(deliverable.minFollowers);
          //@ts-ignore
          const maxFollowersNumber = resolveToNumber(deliverable.maxFollowers);
          if (minFollowersNumber > maxFollowersNumber) {
            throw new Error(
              `Deliverable ${i + 1} should have a valid followers range!`
            );
          }
          if (
            (!deliverable.storyCount &&
              !deliverable.imagePostCount &&
              !deliverable.linkInBioDuration &&
              !deliverable.videoPostCount) ||
            (deliverable.storyCount === 0 &&
              deliverable.imagePostCount === 0 &&
              deliverable.linkInBioDuration === 0 &&
              deliverable.videoPostCount === 0)
          )
            throw new Error(
              `Deliverable ${i + 1} should have at least one deliverable type!`
            );
          if (
            !deliverable.extraValues ||
            Object.keys(deliverable.extraValues).length === 0
          ) {
            throw new Error(
              `Deliverable ${
                i + 1
              } should have at least one in return value type!`
            );
          }
          if (
            deliverable.extraValues.collaborationPrice &&
            deliverable.extraValues.collaborationPrice <= 0
          ) {
            throw new Error(
              `Deliverable ${i + 1} should have a valid collaboration price!`
            );
          }
          if (
            deliverable.extraValues.discountPrice &&
            deliverable.extraValues.discountPrice <= 0
          ) {
            throw new Error(
              `Deliverable ${i + 1} should have a valid discount!`
            );
          }
          if (
            deliverable.extraValues.productValue &&
            deliverable.extraValues.productValue <= 0
          ) {
            throw new Error(`Deliverable ${i + 1} should have a valid gift!`);
          }
        });
        return true;
      }),
  ],
  validationCheck,
  currentAdvertiser,
  requireAdvertiser,
  async (req: Request, res: Response) => {
    const {
      uploadALogo: logo,
      typeOfCampaign,
      description,
      deliverables: rawDeliverables,
      title,
    } = req.body;
    const deliverables = rawDeliverables.map(
      (deliverable: IInstaDeliverable) => ({
        ...deliverable,
        campaign: resolveCampaignType(deliverable.campaign),
        //@ts-ignore
        minFollowers: resolveToNumber(deliverable.minFollowers),
        //@ts-ignore
        maxFollowers: resolveToNumber(deliverable.maxFollowers),
      })
    );
    const currFile = await getDBFile({ key: logo });
    if (!currFile) throw new BadRequestError("Logo not found!");
    const newCampaign = await newInstaCampaign({
      title,
      aid: req.currentAdvertiser!._id.toString(),
      description,
      logo,
      deliverables,
    });
    return res.status(200).send({ campaign: newCampaign });
  }
);

export { route as createInstaCampaignRouter };
