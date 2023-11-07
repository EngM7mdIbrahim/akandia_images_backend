import mongoose from "mongoose";
import { BaseError } from "./base-error";

export class UnAuthorizedError extends BaseError {
  statusCode = 401;
  constructor(public message: string = "You are not authorized to proceed with this action!") {
    super(message);

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
