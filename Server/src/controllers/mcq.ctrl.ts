import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  IMcq,
  IWDMcq,
} from "./../models/questions/comprehension/mcq/mcq.model.d";
import { McqModel } from "../models/questions/comprehension/mcq/mcq.model";
import { customError } from "../utils/customError";
import isValidMongoId from "../utils/isValidMongoId";

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
    if (!isValidMongoId(req.params.qId))
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

const update = asyncHandler(
  async (
    req: Request<{ qId: string }, {}, Partial<IMcq<any>>>,
    res: Response
  ) => {
    if (!isValidMongoId(req.params.qId))
      throw new customError(400, "update mcqCtrl failed: invalid mcq id");
    const mcq = await McqModel.findById(req.params.qId).lean().exec();
    if (!mcq) throw new customError(404, "update mcq failed: mcq not found.");
    if (
      req.body.answer &&
      (typeof req.body.answer !== typeof mcq.options[0] ||
        !mcq.options.includes(req.body.answer))
    ) {
      throw new customError(400, "update mcq failed: invalid answer");
    }
    const updatedMcq = await McqModel.findByIdAndUpdate(
      req.params.qId,
      req.body,
      {
        new: true,
      }
    );
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "mcq updated",
      payload: updatedMcq,
    });
  }
);

export const mcqCtrl = {
  create,
  getOne,
  update,
};
