import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../../../errors/unauthorized-scope";
import { ADMIN_SCOPES } from "../../../models/Admin/Admin";

export default function requireGetSingleCampaign(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.currentAdmin) {
    throw new UnAuthorizedError();
  }
  if (
    !req.currentAdmin.scopes.includes(ADMIN_SCOPES.GET_SINGLE_CAMPAIGN) &&
    !req.currentAdmin.scopes.includes(ADMIN_SCOPES.SUPER_ADMIN)
  ) {
    throw new UnAuthorizedError();
  }
  next();
}
