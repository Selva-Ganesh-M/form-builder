import { IModelDefaults } from "../model";
import { EQuestionType } from "../questions/question.model";
import { EFormStatus } from "./form.model";

export interface IFormSchema {
  title: string;
  questions: Array<{
    _id: mongoose.Types.ObjectId;
    questionType: EQuestionType;
  }>;
  status: EFormStatus;
  headerImg: string;
}

export interface IWDFormSchema extends Partial<IFormSchema> {
  title: string;
  questions: Array<{
    _id: mongoose.Types.ObjectId;
    questionType: EQuestionType;
  }>;
}

export interface IFormLeanDoc extends IFormSchema, IModelDefaults {}
