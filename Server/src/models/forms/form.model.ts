import { IWDFormSchema } from "./form.model.d";
import mongoose from "mongoose";

export enum EFormStatus {
  pending = "pending",
  submitted = "submitted",
}

export enum EQuestionTypes {
  CategorizeQModel = "CategorizeQModel",
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
        kind: {
          type: String,
          enum: EQuestionTypes,
        },
        questionRef: {
          type: mongoose.Types.ObjectId,
          refPath: "questions.kind",
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
