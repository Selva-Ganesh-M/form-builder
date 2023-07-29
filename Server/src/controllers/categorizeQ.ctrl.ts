import {
  ICategorizeQLean,
  IWDCategorizeQ,
} from "./../models/questions/categorize/categorize.q.model.d";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { CategorizeQModel } from "../models/questions/categorize/categorize.q.model";
import isValidMongoId from "../utils/isValidMongoId";
import { customError } from "../utils/customError";

const create = asyncHandler(
  async (req: Request<{}, {}, IWDCategorizeQ, {}>, res: Response) => {
    const prepQuestion = new CategorizeQModel(req.body);
    const question = await prepQuestion.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "categorized question created.",
      payload: question,
    });
  }
);

const get = asyncHandler(
  async (req: Request<{}, {}, {}, { qId: string }>, res: Response) => {
    if (req.query.qId) {
      const { qId } = req.query;
      if (!isValidMongoId(qId))
        throw new customError(
          400,
          "get one categorized question failed: invalid question id."
        );
      const question = await CategorizeQModel.findById(qId).lean();
      if (!question)
        throw new customError(404, "get one cQ failed: question not found");
      res.status(200).json({
        statusText: "success",
        statusCode: 200,
        message: "fetched one categorized question",
        payload: question,
      });
    } else {
      const questions = await CategorizeQModel.find().lean();
      res.status(200).json({
        statusText: "success",
        statusCode: 200,
        message: "fetched all categorize",
        payload: questions,
      });
    }
  }
);

// const getAll = asyncHandler(async (req: Request, res: Response) => {
//   const questions = await CategorizeQModel.find().lean();
//   res.status(200).json({
//     statusText: "success",
//     statusCode: 200,
//     message: "fetched all categorize",
//     payload: questions,
//   });
// });

// const getOne = asyncHandler(
//   async (req: Request<{}, {}, {}, { qId: string }>, res: Response) => {
//     const { qId } = req.query;
//     if (!isValidMongoId(qId))
//       throw new customError(
//         400,
//         "get one categorized question failed: invalid question id."
//       );
//     const question = await CategorizeQModel.findById(qId).lean();
//     if (!question)
//       throw new customError(404, "get one cQ failed: question not found");
//     res.status(200).json({
//       statusText: "success",
//       statusCode: 200,
//       message: "fetched one categorized question",
//       payload: question,
//     });
//   }
// );

const deleteOne = asyncHandler(
  async (req: Request<{}, {}, {}, { qId: string }>, res: Response) => {
    const { qId } = req.query;
    if (!isValidMongoId(qId))
      throw new customError(
        400,
        "delete one categorized question failed: invalid question id."
      );
    const question = await CategorizeQModel.findById(qId).lean();
    if (!question)
      throw new customError(404, "delete one cQ failed: question not found");
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "delete one categorized question",
      payload: question,
    });
  }
);

const update = asyncHandler(
  async (
    req: Request<{ qId: string }, {}, Partial<ICategorizeQLean>>,
    res: Response
  ) => {
    const qId = req.params.qId;
    if (!isValidMongoId(qId))
      throw new customError(
        404,
        "update categorizeQ failed: invalid mongo ID."
      );
    const updatedModel = await CategorizeQModel.findByIdAndUpdate(
      qId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedModel)
      throw new customError(
        404,
        "update CategorizeQModel failed: cateQ not found"
      );
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "cateQ updated",
      payload: updatedModel,
    });
  }
);

export const cQCtrl = {
  // getAll,
  // getOne,
  deleteOne,
  create,
  get,
  update,
};
