import { BaseError } from "./base-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends BaseError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super("Received invalid request body!");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeError(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => ({
      message: err.msg,
      field:
        err.type === "field"
          ? err.path
          : err.type === "unknown_fields"
          ? err.fields.map((field) => field.path).toString()
          : "Unknown field",
    }));
  }
}
