import { ISt, IWDSt } from "./../models/questions/comprehension/st/st.model.d";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { StModel } from "../models/questions/comprehension/st/st.model";
import isValidMongoId from "../utils/isValidMongoId";
import { customError } from "../utils/customError";

const create = asyncHandler(
  async (req: Request<{}, {}, IWDSt>, res: Response) => {
    const prep = new StModel(req.body);
    const st = await prep.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "st created",
      payload: st,
    });
  }
);

const update = asyncHandler(
  async (req: Request<{ qId: string }, {}, Partial<ISt>>, res: Response) => {
    if (!req.params.qId)
      throw new customError(400, "update st failed: invalid st id");
    const st = await StModel.findByIdAndUpdate(req.params.qId, req.body, {
      new: true,
    });
    if (!st) throw new customError(404, "update st failed: st not found");
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "updated one st",
      payload: st,
    });
  }
);

const getOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!isValidMongoId(req.params.qId))
      throw new customError(400, "getOne st failed: invalid st IModelDefaults");
    const st = await StModel.findById(req.params.qId).lean().exec();
    if (!st) throw new customError(404, "get one st failed: st not found");
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "fetched one st",
      payload: st,
    });
  }
);

const deleteOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!isValidMongoId(req.params.qId))
      throw new customError(400, "delete one st failed: invalid st id");
    const st = await StModel.findByIdAndDelete(req.params.qId).lean().exec();
    if (!st) throw new customError(404, "delete st failed: st not found");
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "one st deleted",
      payload: st,
    });
  }
);

export const stCtrl = {
  create,
  getOne,
  deleteOne,
  update,
};
