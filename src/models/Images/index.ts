import { Document, Model, Schema, model } from "mongoose";
import { IImageData } from "../../types/ImageData";

export interface IImageDataDoc extends Document, IImageData {

}

interface IImageDataModel extends Model<IImageDataDoc> {
  build(image: IImageData): IImageDataDoc;
}
const imagesSchema = new Schema<
  IImageDataDoc,
  IImageDataModel
>(
  {
    name:{
      type: String,
      required: true,
    },
    width:{
      type: Number,
      required: true,
    },
    height:{
      type: Number,
      required: true,
    },
    link:{
      type: String,
      required: true,
    },
    previewLink:{
      type: String,
      required: true,
    },
    fileSize:{
      type: Number,
      required: true,
    },
    timeTaken:{
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (_, ret) {
        delete ret.__v;
      },
    },
  }
);

imagesSchema.statics.build = (image: IImageData) => {
  return new ImagesData(image);
};

const ImagesData = model("Image", imagesSchema);

export { ImagesData };
