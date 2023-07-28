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

  // #region : data prep
  if (error instanceof customError) {
    devMessage = error.devMessage;
    statusCode = error.statusCode;
  }

  // #endregion : data prep

  res.status(statusCode).json({
    statusText: "failure",
    statusCode,
    devMessage,
    message: error.message,
  });
};
