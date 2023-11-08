import { Router } from "express";
import { AddFrameRouter } from "./routes/add-frame";


const router = Router();

router.use("/images",AddFrameRouter)

export { router as ImagesRouter };