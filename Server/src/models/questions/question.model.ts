import { IWDQuestionSchema } from "./question.model.d";
import mongoose from "mongoose";

export enum EQuestionType {
  categorize = "categorize",
  cloze = "cloze",
  comprehension = "comprehension",
}

const questionSchema = new mongoose.Schema<IWDQuestionSchema>(
  {
    questionRefId: {
      type: String,
      required: [true, "Question ref id is a required field."],
      refPath: "questionType",
    },
    questionType: {
      type: String,
      enum: [
        EQuestionType.categorize,
        EQuestionType.cloze,
        EQuestionType.comprehension,
      ],
      required: [true, "Question type must be provided."],
    },
  },
  {
    timestamps: true,
  }
);

export const QuestionModel = mongoose.model("Question", questionSchema);

type TQuestion = typeof QuestionModel;

export interface IQuestionDoc extends TQuestion {}
