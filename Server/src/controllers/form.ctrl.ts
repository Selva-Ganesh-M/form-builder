import { IFormLeanDoc, IWDFormSchema } from "../models/forms/form.model.d";
import { FormModel } from "../models/forms/form.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import isValidMongoId from "../utils/isValidMongoId";
import { customError } from "../utils/customError";

const getAllForms = asyncHandler(async (req: Request, res: Response) => {
  const forms: Array<IFormLeanDoc> = await FormModel.find()
    // .populate("questions.questionRef")
    // .populate("questions.questionRef.compQuestions.questionRef")
    .populate({
      path: "questions.questionRef",
      populate: {
        path: "compQuestions.questionRef",
      },
    })
    .lean();
  return res.status(200).json({
    statusText: "success",
    statusCode: 200,
    message: "fetch forms success",
    payload: forms,
  });
});

const getSingleForm = asyncHandler(
  async (req: Request<{ formId: string }>, res: Response) => {
    if (!isValidMongoId(req.params.formId))
      throw new customError(
        404,
        `get single form failed: invalid formId - ${req.params.formId}`
      );
    const form: IFormLeanDoc | null = await FormModel.findById(
      req.params.formId
    )
      .populate("questions.questionRef")
      .lean();
    if (!form)
      throw new customError(404, "get single form failed: form not found.");
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "get single form success",
      payload: form,
    });
  }
);

const createForm = asyncHandler(
  async (req: Request<{}, {}, IWDFormSchema>, res: Response) => {
    const prepForm = new FormModel(req.body);
    req.body.questions.forEach((question) => {
      if (!isValidMongoId(question.questionRef))
        throw new customError(
          404,
          `create form failed: form has invalid question ID - ${question.questionRef}`
        );
    });
    const newForm = await prepForm.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "new form created",
      payload: newForm,
    });
  }
);

const deleteForm = asyncHandler(
  async (req: Request<{ formId: string }>, res: Response) => {
    const form = await FormModel.findByIdAndDelete(req.params.formId);
    res.status(202).json({
      statusText: "success",
      statusCode: 202,
      message: "form deleted",
      payload: form,
    });
  }
);

asyncHandler(async (req: Request, res: Response) => {});

export const formCtrl = {
  getAllForms,
  createForm,
  deleteForm,
  getSingleForm,
};
