import { NextFunction, Request, Response } from "express";
import { NotAuthenticatedError } from "../../errors/not-authenticated-error";

export default function requireAdmin(req:Request, res: Response, next:NextFunction){
  if(!req.currentAdmin){
    throw new NotAuthenticatedError();
  }
  next();
}