import { NextFunction, Request, Response } from "express";
import { customError } from "../utils/customError";

export const customErrorHandler = async (
  error: Error | customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let devMessage: string = error.message;
  let statusCode: number = 500;
  let stack = null;

  // #region : data prep
  if (error instanceof customError) {
    devMessage = error.devMessage;
    statusCode = error.statusCode;
    stack = error.stack;
  }

  // #endregion : data prep

  console.log(statusCode, devMessage);

  res.status(statusCode).json({
    statusText: "failure",
    statusCode,
    devMessage,
    message: error.message,
    stack,
  });
};
