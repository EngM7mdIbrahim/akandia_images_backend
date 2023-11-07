import { NextFunction, Request, Response } from "express";
import { NotAuthenticatedError } from "../errors/not-authenticated-error";

export default function requireAuth(req:Request, res: Response, next:NextFunction){
  if(!req.currentUser){
    throw new NotAuthenticatedError();
  }
  next();
}