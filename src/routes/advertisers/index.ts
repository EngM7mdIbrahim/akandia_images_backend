import { Express } from "express";
import { currentAdvertiserRouter } from "./current-user";
import { advertiserSignupRouter } from "./signup";

export default function advertisersBinder(app: Express) {
  app.use(currentAdvertiserRouter);
  app.use(advertiserSignupRouter)
}
