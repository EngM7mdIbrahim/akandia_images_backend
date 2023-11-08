import { Request, Response, Router } from "express";
import path from "path";

import Busboy from "busboy";
import { mergeImages } from "../../../utils/merge-image";
import { FRAMES } from "../../../constants/frames";
import writeFile from "../../../utils/write-file";
import Monitor from "../../../types/classes/Monitor";

const router = Router();

router.post("/add-frame", (req: Request, res: Response) => {
  const bb = Busboy({ headers: req.headers });
  const monitor = new Monitor();
  let pathToSave = "";
  bb.on("file", async (_, file, info) => {
    monitor.start();
    pathToSave = path.join("src/uploads", info.filename);
    await writeFile(file, pathToSave);
  });
  bb.on("finish", async () => {
    await mergeImages(FRAMES[0], pathToSave);
    monitor.end();
    res
      .status(201)
      .send({
        message: "Finished uploading all files!",
        timeTaken: monitor.getDuration(),
      });
  });
  req.pipe(bb);
});

export { router as AddFrameRouter };
