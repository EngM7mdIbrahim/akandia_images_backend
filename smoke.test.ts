import request from "supertest";
import app, { appSetup } from "./app";
import getImagesData from "./src/models/Images/operations/get-images-data";
import { IImageData } from "./src/types/ImageData";

jest.setTimeout(30000);
beforeAll(async () => {
  appSetup();
});
describe("End to End test", () => {
  it("If sent image corresponds to the one in the DB!", async () => {
    const postResponse = await request(app)
      .post("/images/add-frame")
      .attach("image", "test-assets/test-image.jpg")
      .expect(201);

    const getInsightsResponse = await request(app)
      .get("/images/get-stats")
      .expect(200);

    const image = getInsightsResponse.body.find(
      (image: IImageData) => image.link === postResponse.body.link
    );

    expect(image).toBeDefined();
  });
});
