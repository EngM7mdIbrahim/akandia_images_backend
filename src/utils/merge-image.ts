import Jimp from "jimp";
import path from "path";
import { IFrameMeta } from "../types/FrameMeta";
import deleteFile from "./delete-file";

export async function mergeImages(
  frame: IFrameMeta,
  imageName: string
): Promise<{link: string, previewLink: string, width: number, height: number}> {
    const imagePath = path.join("preview", imageName)
    const frameImg = await Jimp.read(path.join("frames", "frame.png"));
    const uploadImg = await Jimp.read(imagePath);
    const originalWidth = uploadImg.getWidth();
    const originalHeight = uploadImg.getHeight();
    // Resize the uploaded image to fit the frame
    uploadImg.cover(frame.IMAGE_WIDTH, frame.IMAGE_HEIGHT);
    // Composite the two images
    frameImg.composite(
      uploadImg,
      frame.IMAGE_TOP_LEFT.X,
      frame.IMAGE_TOP_LEFT.Y
    );

    // Save the merged image
    await frameImg.writeAsync(path.join("downloads", imageName));
    const link = `http://localhost:${process.env.PORT}/downloads/${imageName}`
    const previewLink = `http://localhost:${process.env.PORT}/preview/${imageName}`
    return {link, previewLink, width: originalWidth, height: originalHeight }
  
}
