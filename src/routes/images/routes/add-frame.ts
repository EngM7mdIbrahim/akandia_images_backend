import { Request, Response, Router } from "express";
import path from "path";

import Busboy from "busboy";
import { mergeImages } from "../../../utils/merge-image";
import { FRAMES } from "../../../constants/frames";
import writeFile from "../../../utils/write-file";
import Monitor from "../../../types/classes/Monitor";
import newImagesData from "../../../models/Images/operations/new-image-data";

const router = Router();

router.post("/add-frame", (req: Request, res: Response) => {
  const bb = Busboy({ headers: req.headers });
  const monitor = new Monitor();
  let fileName = "";
  bb.on("file", async (_, file, info) => {
    monitor.start();
    fileName = info.filename
    await writeFile(file, path.join("temp", info.filename));
  });
  bb.on("finish", async () => {
    const {link, width, height} = await mergeImages(FRAMES[0], fileName);
    monitor.end();
    res
      .status(201)
      .send({
        message: "Finished uploading all files!",
        link,
        timeTaken: monitor.getDuration(),
      });
    await newImagesData({
      name: fileName,
      width,
      height,
      link,
      timeTaken: monitor.getDuration(),
    })
  });
  req.pipe(bb);
});

export { router as AddFrameRouter };
