import {
  IWDMca,
  IMca,
} from "./../models/questions/comprehension/mca/mca.model.d";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { customError } from "../utils/customError";
import isValidMongoId from "../utils/isValidMongoId";
import { McaModel } from "../models/questions/comprehension/mca/mca.model";

const create = asyncHandler(
  async (req: Request<{}, {}, IWDMca<any>>, res: Response) => {
    const mcaPrep = new McaModel(req.body);
    const mca = await mcaPrep.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "mca created",
      payload: mca,
    });
  }
);

const getOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!isValidMongoId(req.params.qId))
      throw new customError(404, "get one mca failed: invalid mca id.");
    const mca = await McaModel.findById(req.params.qId).lean().exec();
    if (!mca) throw new customError(404, "get one mca failed: mca not found");
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "fetched mca",
      payload: mca,
    });
  }
);

const update = asyncHandler(
  async (
    req: Request<{ qId: string }, {}, Partial<IMca<any>>>,
    res: Response
  ) => {
    if (!isValidMongoId(req.params.qId))
      throw new customError(400, "update mcaCtrl failed: invalid mca id");
    const mca = await McaModel.findById(req.params.qId).lean().exec();
    if (!mca) throw new customError(404, "update mca failed: mca not found.");
    if (
      req.body.answers &&
      !req.body.answers.every((item) => mca.options.includes(item))
    ) {
      throw new customError(
        400,
        "update mca failed: some or many answers not in options"
      );
    }
    const updatedMca = await McaModel.findByIdAndUpdate(
      req.params.qId,
      req.body,
      {
        new: true,
      }
    );
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "mca updated",
      payload: updatedMca,
    });
  }
);

export const mcaCtrl = {
  create,
  getOne,
  update,
};
