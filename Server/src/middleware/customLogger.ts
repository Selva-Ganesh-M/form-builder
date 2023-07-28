import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logWriter } from "../utils/logWriter";

export const customLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();

  // #region : server console customLogger
  const log: string = `${req.method}\t${req.path}`;
  console.log(log);
  // #endregion : server console customLogger

  // #region : server logRecord
  const logRecord = `${uuidv4()}\t${date.toDateString()}\t${log}\t${
    req.headers.origin
  }`;
  await logWriter(logRecord);

  // #endregion : server logRecord
  next();
};
