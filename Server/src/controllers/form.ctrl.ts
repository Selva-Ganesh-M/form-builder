import { IFormLeanDoc, IWDFormSchema } from "../models/forms/form.model.d";
import { FormModel } from "../models/forms/form.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import isValidMongoId from "../utils/isValidMongoId";
import { customError } from "../utils/customError";

const getAllForms = asyncHandler(async (req: Request, res: Response) => {
  const forms: Array<IFormLeanDoc> = await FormModel.find().lean();
  return res.status(200).json({
    statusText: "success",
    statusCode: 200,
    message: "fetch forms success",
    payload: forms,
  });
});

export const createForm = asyncHandler(
  async (req: Request<{}, {}, IWDFormSchema>, res: Response) => {
    const prepForm = new FormModel(req.body);
    req.body.questions.forEach((question) => {
      if (!isValidMongoId(question._id))
        throw new customError(
          404,
          `create form failed: form has invalid question ID - ${question._id}`
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

export const deleteForm = asyncHandler(
  async (req: Request<{ formId: string }>, res: Response) => {
    const form = await FormModel.findByIdAndDelete(req.params.formId);
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
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
};
