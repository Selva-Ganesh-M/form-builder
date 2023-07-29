import { IModelDefaults } from "../model";
import { EQuestionType } from "../questions/question.model";
import { EFormStatus } from "./form.model";

export interface IFormSchema {
  title: string;
  questions: Array<{
    kind: EQuestionType;
    questionRef: mongoose.Types.ObjectId;
  }>;
  status: EFormStatus;
  headerImg: string;
}

export interface IWDFormSchema extends Partial<IFormSchema> {
  title: string;
  questions: Array<{
    kind: EQuestionType;
    questionRef: mongoose.Types.ObjectId;
  }>;
}

export interface IFormLeanDoc extends IFormSchema, IModelDefaults {}
