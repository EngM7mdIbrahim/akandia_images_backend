import express from "express";
import { currentUser } from "../../middlewares/current-user";
import { ROUTES } from "../../constants/routes";
import { currentAdvertiser } from "../../middlewares/current-advertiser";

const router = express.Router();

router.get(
  ROUTES.ADVERTISERS.CURRENT_USER,
  currentUser,
  currentAdvertiser,
  async (req, res) => {
    res.send({ currentAdvertiser: req.currentAdvertiser || null });
  }
);

export { router as currentAdvertiserRouter };
