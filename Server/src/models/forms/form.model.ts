import { customError } from "../../utils/customError";
import isValidMongoId from "../../utils/isValidMongoId";
import { CategorizeQModel } from "../questions/categorize/categorize.q.model";
import { CompQModel } from "../questions/comprehension/compQ.model";
import { IWDFormSchema } from "./form.model.d";
import mongoose from "mongoose";

export enum EFormStatus {
  pending = "pending",
  submitted = "submitted",
}

export enum EQuestionTypes {
  CategorizeQ = "CategorizeQ",
  CompQ = "CompQ",
}

const formSchema = new mongoose.Schema<IWDFormSchema>(
  {
    title: {
      type: String,
      required: [true, "Form title is a required field."],
    },
    status: {
      type: String,
      enum: EFormStatus,
      default: EFormStatus.pending,
    },
    headerImg: {
      type: String,
      default: "",
    },
    questions: [
      {
        _id: false,
        kind: {
          type: String,
          enum: EQuestionTypes,
        },
        questionRef: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "questions.kind",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

formSchema.pre("save", async function (next) {
  // checking the questions
  const promises = this.questions.map((q) => {
    if (!isValidMongoId(q.questionRef))
      next(
        new customError(
          400,
          "create form failed: some of question id is invalid."
        )
      );
    switch (q.kind) {
      case EQuestionTypes.CategorizeQ:
        return CategorizeQModel.findById(q.questionRef).lean().exec();
      case EQuestionTypes.CompQ:
        return CompQModel.findById(q.questionRef).lean().exec();
    }
  });

  const questions = await Promise.all(promises);
  // if can't find question send error
  if (!questions.every((q) => q))
    next(
      new customError(
        400,
        "create form failed: some questions does not exists."
      )
    );
  next();
});

export const FormModel = mongoose.model("Form", formSchema);
export type TFormModel = typeof FormModel;
export interface IFormModel extends TFormModel {}
