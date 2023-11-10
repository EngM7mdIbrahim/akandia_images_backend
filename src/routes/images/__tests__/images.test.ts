import request from "supertest";
import { IImageData } from "../../../types/ImageData";
import app, { appSetup } from "../../../../app";

jest.setTimeout(30000);
beforeAll(async () => {
  appSetup();
});

describe("Images Route", () => {
  it("POST /images/add-frame", async () => {
    const postResponse = await request(app)
      .post("/images/add-frame")
      .attach("image", "test-assets/test-image.jpg")
      .expect(201);
    expect(postResponse.body).toHaveProperty("link");
    expect(postResponse.body).toHaveProperty("timeTaken");
  });

  it("GET /images/get-stats", async () => {
    const getResponse = await request(app)
      .get("/images/get-stats")
      .expect(200);
    expect(getResponse.body).toBeInstanceOf(Array);
    getResponse.body.forEach((image: IImageData) => {
        expect(image).toHaveProperty("name");
        expect(image).toHaveProperty("width");
        expect(image).toHaveProperty("height");
        expect(image).toHaveProperty("link");
        expect(image).toHaveProperty("timeTaken");
        expect(image).toHaveProperty("fileSize");
        expect(image).toHaveProperty("previewLink");
    });
  });
});
