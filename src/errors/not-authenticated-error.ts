import mongoose from "mongoose";
import { BaseError } from "./base-error";

export class NotAuthenticatedError extends BaseError {
  statusCode = 403;
  constructor(public message = "You are not signed in as a general user to proceed!") {
    super(message);

    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }
  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
