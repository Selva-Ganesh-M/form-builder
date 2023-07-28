import express, { NextFunction } from "express";
import core from "express-serve-static-core";

export const asyncHandler =
  (cb: any) =>
  async (...args: any[]) => {
    const next = args[args.length - 1] as NextFunction;
    try {
      await cb(...args);
      next();
    } catch (err) {
      next(err);
    }
  };
