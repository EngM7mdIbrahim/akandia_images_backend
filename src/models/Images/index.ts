import { Document, Model, Schema, model } from "mongoose";
import { IImageData } from "../../types/ImageData";



//TODO: 'Change attributes of the campaign here!'
export interface IImageDataDoc extends Document, IImageData {

}

interface IImageDataModel extends Model<IImageDataDoc> {
  build(deliverable: IImageData): IImageDataDoc;
}

//TODO: 'Change attributes of the campaign here!'
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

imagesSchema.statics.build = (deliverable: IImageData) => {
  return new ImagesData(deliverable);
};

const ImagesData = model("Image", imagesSchema);

export { ImagesData };
