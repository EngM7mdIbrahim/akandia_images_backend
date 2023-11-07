import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../errors/unauthorized-scope";

export default function requireAdvertiser(req:Request, res: Response, next:NextFunction){
  if(!req.currentAdvertiser){
    throw new UnAuthorizedError("You are not signed in as advertiser to perform this action!");
  }
  next();
}