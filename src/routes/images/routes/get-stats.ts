import { Request, Response, Router } from "express";
import getImagesData from "../../../models/Images/operations/get-images-data";

const router = Router();

router.get("/get-stats", async (req: Request, res: Response) => {
  const images = await getImagesData({});
  return res.status(200).send(images?.map((image) => image.toJSON()));
});

export { router as GetStatsRouter };
