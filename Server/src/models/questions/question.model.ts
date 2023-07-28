import { EQuestionType, IWDQuestionSchema } from "./question.model.d";
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema<IWDQuestionSchema>(
  {
    questionType: {
      type: String,
      enum: [
        EQuestionType.categorize,
        EQuestionType.cloze,
        EQuestionType.comprehension,
      ],
      required: [true, "Question type must be provided."],
    },
    questionRefId: {
      type: String,
      required: [true, "Question ref id is a required field."],
    },
  },
  {
    timestamps: true,
  }
);

export const questionModel = mongoose.model("question", questionSchema);

type TQuestion = typeof questionModel;

interface IQuestionDoc extends TQuestion {}
