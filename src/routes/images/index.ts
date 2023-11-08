import { Router } from "express";
import { AddFrameRouter } from "./routes/add-frame";
import { GetStatsRouter } from "./routes/get-stats";


const router = Router();

router.use("/images",AddFrameRouter)
router.use("/images",GetStatsRouter)

export { router as ImagesRouter };