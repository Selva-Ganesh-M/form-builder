import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { IWDMcq } from "./../models/questions/comprehension/mcq/mcq.model.d";
import { McqModel } from "../models/questions/comprehension/mcq/mcq.model";
import { customError } from "../utils/customError";

const create = asyncHandler(
  async (req: Request<{}, {}, IWDMcq<any>>, res: Response) => {
    const mcqPrep = new McqModel(req.body);
    const mcq = await mcqPrep.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "mcq created",
      payload: mcq,
    });
  }
);

const getOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!req.params.qId)
      throw new customError(404, "get one mcq failed: invalid mcq id.");
    const mcq = await McqModel.findById(req.params.qId).lean().exec();
    if (!mcq) throw new customError(404, "get one mcq failed: mcq not found");
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "fetched mcq",
      payload: mcq,
    });
  }
);

export const mcqCtrl = {
  create,
  getOne,
};
