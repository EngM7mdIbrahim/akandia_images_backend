import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/base-error";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    console.log("Error Type: ", typeof err);
    console.log("Error Message: ", err.serializeError());
    console.log("Error Status Code: ", err.statusCode);
    res.status(err.statusCode).send({ errors: err.serializeError() });
  } else {
    console.log("Error Message: ", err.message);
    res.status(500).send({ errors: [{ message: err.message }] });
  }
}
