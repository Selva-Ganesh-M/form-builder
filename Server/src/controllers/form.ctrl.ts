import { IFormLeanDoc, IWDFormSchema } from "../models/forms/form.model.d";
import { FormModel } from "../models/forms/form.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

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
    const newForm = await prepForm.save();
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "new form created",
      payload: newForm,
    });
  }
);

export const formCtrl = {
  getAllForms,
  createForm,
};
