import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../../../errors/unauthorized-scope";
import { ADMIN_SCOPES } from "../../../models/Admin/Admin";

export default function requireGetAllCampaigns(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.currentAdmin) {
    throw new UnAuthorizedError();
  }
  if (
    !req.currentAdmin.scopes.includes(ADMIN_SCOPES.GET_ALL_CAMPAIGNS) &&
    !req.currentAdmin.scopes.includes(ADMIN_SCOPES.SUPER_ADMIN)
  ) {
    throw new UnAuthorizedError();
  }
  next();
}
