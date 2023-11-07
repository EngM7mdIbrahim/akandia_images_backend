import { Request, Response, Router } from "express";
import { ROUTES } from "../../constants/routes";
import { body } from "express-validator";
import validationCheck from "../../middlewares/validation-check";
import { BadRequestError } from "../../errors/bad-request-error";
import { IUserDoc, User } from "../../models/User/User";
import getUser from "../../models/User/operations/get-user";
import { currentUser } from "../../middlewares/current-user";
import { currentAdvertiser } from "../../middlewares/current-advertiser";
import newAdvertiser from "../../models/Advertiser/operations/new-advertiser";
import requireAuth from "../../middlewares/require-auth";
import getPopulatedInstance from "../../models/Advertiser/operations/to-populated";

const route = Router();

route.post(
  ROUTES.ADVERTISERS.SIGN_UP,
  currentUser,
  requireAuth,
  [
    body("name").exists().withMessage("Please enter your email!"),
    body("industry").exists().withMessage("Please enter your industry!"),
    body("designation").exists().withMessage("Please enter your designation!"),
  ],
  validationCheck,
  currentAdvertiser,
  async (req: Request, res: Response) => {
    if (req.currentAdvertiser)
      throw new BadRequestError("You are already an advertiser!");

    const { name, industry, designation } = req.body;

    console.log(req.currentUser);
    const currentAdvertiser = await newAdvertiser({
      designation,
      industry,
      name,
      uid: req.currentUser!.uid,
    });
    const populatedAdvertiser = await getPopulatedInstance(currentAdvertiser);

    return res.status(200).send({ currentAdvertiser: populatedAdvertiser });
  }
);

export { route as advertiserSignupRouter };
