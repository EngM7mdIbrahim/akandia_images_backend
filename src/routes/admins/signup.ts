import { Request, Response, Router } from "express";
import { ROUTES } from "../../constants/routes";
import { body } from "express-validator";
import validationCheck from "../../middlewares/validation-check";
import { BadRequestError } from "../../errors/bad-request-error";
import { currentUser } from "../../middlewares/current-user";
import requireAuth from "../../middlewares/require-auth";
import getPopulatedInstance from "../../models/Admin/operations/to-populated";
import { ADMIN_SCOPES } from "../../models/Admin/Admin";
import { currentAdmin } from "../../middlewares/admin/current-admin";
import newAdmin from "../../models/Admin/operations/new-admin";

const route = Router();

route.post(
  ROUTES.ADMINS.SIGN_UP,
  currentUser,
  requireAuth,
  [
    body("name").exists().withMessage("Please enter your name!"),
    body("scopes").custom((scopes: string[]) => {
      if (!Array.isArray(scopes) || scopes.length < 0)
        throw new Error("Please enter a valid scopes field!");
      scopes.forEach((scope, index) => {
        if ((Object.values(ADMIN_SCOPES) as string[]).indexOf(scope) < 0)
          throw new Error(`Please enter a valid scope at index ${index}!`);
      });
      return true;
    }),
  ],
  validationCheck,
  currentAdmin,
  async (req: Request, res: Response) => {
    if (req.currentAdmin)
      throw new BadRequestError("You are already an admin!");

    const { name, scopes } = req.body;

    console.log(req.currentUser);
    const currentAdmin = await newAdmin({
      scopes,
      name,
      uid: req.currentUser!.uid,
    });
    const populatedAdmin = await getPopulatedInstance(currentAdmin);

    return res.status(200).send({ currentAdvertiser: populatedAdmin });
  }
);

export { route as adminSignUpRouter };
