import { Request, Response, NextFunction } from "express";
import { PopulatedAdvertiser } from "../types/PopulatedAdvertiser";
import getAdvertiser from "../models/Advertiser/operations/get-advertiser";

declare global {
  namespace Express {
    interface Request {
      currentAdvertiser?: PopulatedAdvertiser;
    }
  }
}

export const currentAdvertiser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const currentUserID = req.currentUser?.uid;
    req.currentAdvertiser =
      (await getAdvertiser({ uid: currentUserID })) || undefined;
  } catch (e) {
    console.log(e);
  }
  return next();
};
