import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";

const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const obj = plainToInstance(type, req[value]);
      const errors: ValidationError[] = await validate(obj, {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
      });

      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .flat()
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    } catch (err) {
      next(new HttpException(500, "Internal Server error"));
    }
  };
};

export default validationMiddleware;
