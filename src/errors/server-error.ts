import mongoose from "mongoose";
import { BaseError } from "./base-error";

export class ServerError extends BaseError {
  statusCode = 500;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
