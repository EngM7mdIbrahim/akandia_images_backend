import Jimp from "jimp";
import { FrameMeta } from "../types/FrameMeta";

export async function mergeImages(
  frame: FrameMeta,
  imagePath: string
): Promise<void> {
  try {
    const frameImg = await Jimp.read(frame.PATH);
    const uploadImg = await Jimp.read(imagePath);
    // Resize the uploaded image to fit the frame
    uploadImg.cover(frame.IMAGE_WIDTH, frame.IMAGE_HEIGHT);
    // Composite the two images
    frameImg.composite(
      uploadImg,
      frame.IMAGE_TOP_LEFT.X,
      frame.IMAGE_TOP_LEFT.Y
    );

    // Save the merged image
    await frameImg.writeAsync("src/uploads/output.png");
  } catch (err) {
    console.error(err);
  }
}
