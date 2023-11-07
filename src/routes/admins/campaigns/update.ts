import { Request, Response, Router } from "express";
import { ROUTES } from "../../../constants/routes";
import { body, checkExact } from "express-validator";
import validationCheck from "../../../middlewares/validation-check";
import { currentUser } from "../../../middlewares/current-user";
import requireAuth from "../../../middlewares/require-auth";
import { currentAdmin } from "../../../middlewares/admin/current-admin";
import requireAdmin from "../../../middlewares/admin/require-admin";
import validateFileKeyPath from "../../../utils/validate-file-key";
import requireEditCampaign from "../../../middlewares/admin/scopes/require-edit-campaigns";
import { CAMPAIGN_TYPES_FRONT_END_LIST } from "../../../constants/arrays";
import { IInstaDeliverable } from "../../../models/InstaDeliverable/InstaDeliverable";
import updateInstaCampaignSharedRouter from "../../shared/update-insta-campaign";

const route = Router();

route.post(
  ROUTES.ADMINS.UPDATE_CAMPAIGN,
  currentUser,
  requireAuth,
  currentAdmin,
  requireAdmin,
  requireEditCampaign,
  [
    body("key").exists().withMessage("Campaign ID is required!"),
    body("uploadALogo")
      .optional()
      .isString()
      .custom((val) => {
        return validateFileKeyPath(val);
      })
      .withMessage("Enter a valid logo key!"),
    body("description")
      .optional()
      .isString()
      .withMessage("Please enter a valid description!"),
    body("typeOfCampaign")
      .optional()
      .isString()
      .withMessage("Type of Campaign is required!")
      .custom((val) => {
        return CAMPAIGN_TYPES_FRONT_END_LIST.includes(val);
      })
      .withMessage("Please enter a valid type of campaign!"),
    body("title")
      .optional()
      .isString()
      .withMessage("Please enter a valid title!"),
    body("deliverables")
      .optional()
      .isArray()
      .withMessage("Please enter valid deliverables!")
      .custom((deliverables: IInstaDeliverable[]) => {
        if (!Array.isArray(deliverables))
          throw new Error("Deliverables should be an array!");
        deliverables.forEach((deliverable, i) => {
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
    checkExact([], { message: "Unsupported field(s)!" }),
  ],
  validationCheck,
  async (req: Request, res: Response) => {
    console.log("update insta campaign");
    return await updateInstaCampaignSharedRouter(req, res);
  }
);

export { route as updateInstaCampaignRouter };
