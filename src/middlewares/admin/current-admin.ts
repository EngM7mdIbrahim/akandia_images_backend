import { Request, Response, NextFunction } from "express";
import { PopulatedAdmin } from "../../types/PopulatedAdmin";
import getAdmin from "../../models/Admin/operations/get-admin";

declare global {
  namespace Express {
    interface Request {
      currentAdmin?: PopulatedAdmin;
    }
  }
}

export const currentAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const currentUserID = req.currentUser?.uid;
    req.currentAdmin =
      (await getAdmin({ uid: currentUserID })) ?? undefined;
  } catch (e) {
    console.log(e);
  }
  return next();
};
