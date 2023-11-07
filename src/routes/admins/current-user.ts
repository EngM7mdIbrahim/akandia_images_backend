import express from "express";
import { currentUser } from "../../middlewares/current-user";
import { ROUTES } from "../../constants/routes";
import { currentAdmin } from "../../middlewares/admin/current-admin";

const router = express.Router();

router.get(
  ROUTES.ADMINS.CURRENT_USER,
  currentUser,
  currentAdmin,
  async (req, res) => {
    res.send({ currentAdmin: req.currentAdmin || null });
  }
);

export { router as currentAdminRouter };
