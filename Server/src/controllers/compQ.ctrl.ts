import { asyncHandler } from "./../utils/asyncHandler";
import { IWDCompQ } from "./../models/questions/comprehension/compQ.model.d";
import express, { Request, Response } from "express";
import {
  CompQModel,
  ECompQTypes,
} from "../models/questions/comprehension/compQ.model";
import { customError } from "../utils/customError";
import { McaModel } from "../models/questions/comprehension/mca/mca.model";
import { McqModel } from "../models/questions/comprehension/mcq/mcq.model";
import { StModel } from "../models/questions/comprehension/st/st.model";

const create = asyncHandler(
  async (req: Request<{}, {}, IWDCompQ>, res: Response) => {
    const prep = new CompQModel(req.body);
    const compQ = await prep.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "created compQ",
      payload: compQ,
    });
  }
);

const getOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!req.params.qId)
      throw new customError(400, "get one compQ failed: invalid id");
    const compQ = await CompQModel.findById(req.params.qId)
      .populate("compQuestions.questionRef")
      .lean()
      .exec();
    if (!compQ)
      throw new customError(404, "get one compQ failed: compQ not found.");
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "fetched one compQ",
      payload: compQ,
    });
  }
);

const deleteOne = asyncHandler(
  async (req: Request<{ qId: string }>, res: Response) => {
    if (!req.params.qId)
      throw new customError(400, "delete compQ failed: invalid qId");
    const compQ = await CompQModel.findByIdAndDelete(req.params.qId)
      .populate("compQuestions.questionRef")
      .lean()
      .exec();
    if (!compQ)
      throw new customError(404, "delete compQ failed: compQ not found");
    const promises = compQ.compQuestions.map((item) => {
      let status = true;
      switch (item.kind) {
        case ECompQTypes.Mca:
          return McaModel.findByIdAndDelete(item.questionRef).lean().exec();
        case ECompQTypes.Mcq:
          return McqModel.findByIdAndDelete(item.questionRef).lean().exec();
        case ECompQTypes.stQ:
          return StModel.findByIdAndDelete(item.questionRef).lean().exec();
      }
    });
    const deletedSubQs = await Promise.all(promises);
    if (!deletedSubQs.every((item) => item))
      throw new customError(
        500,
        "delete compQ failed: some subQuestion deletion failed."
      );
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "compQ deleted",
      payload: compQ,
    });
  }
);

export const compQCtrl = {
  create,
  getOne,
  deleteOne,
};
