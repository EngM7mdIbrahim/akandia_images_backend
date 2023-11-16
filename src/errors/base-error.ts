export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract serializeError(): { message: string; field?: string }[];
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
