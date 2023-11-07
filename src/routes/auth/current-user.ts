import express from "express";
import { currentUser } from "../../middlewares/current-user";
import { ROUTES } from "../../constants/routes";
import { IUserDoc, User } from "../../models/User/User";
import { ServerError } from "../../errors/server-error";
import getUser from "../../models/User/operations/get-user";

const router = express.Router();

router.get(ROUTES.AUTH.CURRENT_USER, currentUser, async (req, res) => {
  if (req.currentUser) {
    let currentUserDoc: IUserDoc | null;
    currentUserDoc = null;
    try {
      currentUserDoc = await getUser({
        email: req.currentUser.email,
      });
    } catch (e) {
      if (e instanceof ServerError) {
        throw e;
      }
    }
  }
  res.send({ currentUser: req.currentUser || null });
});

export { router as currenUserRouter };
