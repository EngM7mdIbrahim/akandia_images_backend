import { IUserDoc } from "../models/User/User";
import jwt from "jsonwebtoken";

export default function makeAccessToken(
  user: IUserDoc,
): string {
  const token = jwt.sign(
    {
      ...user.toJSON(),
    },
    process.env.JWT_SECRET_KEY!
  );
  return token;
}
