import { Express } from "express";
import { emailSignIn } from "./signin";
import { currenUserRouter } from "./current-user";

export default function authBinder(app: Express) {
  app.use(emailSignIn);
  app.use(currenUserRouter);
}
