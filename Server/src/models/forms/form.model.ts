import { EQuestionType } from "../questions/question.model";
import { IFormSchema } from "./form.model.d";
import mongoose from "mongoose";

export enum EFormStatus {
  pending = "pending",
  submitted = "submitted",
}

const formSchema = new mongoose.Schema<IFormSchema>(
  {
    title: {
      type: String,
      required: [true, "Form title is a required field."],
    },
    status: {
      type: String,
      enum: EFormStatus,
    },
    headerImg: {
      type: String,
      default: "",
    },
    questions: [
      {
        questionId: {
          type: String,
          enum: EQuestionType,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const FormModel = mongoose.model("Form", formSchema);
export type TFormModel = typeof FormModel;
export interface IFormModel extends TFormModel {}
