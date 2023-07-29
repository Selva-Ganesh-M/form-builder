import { IModelDefaults } from "../model";
import { EFormStatus, EQuestionTypes } from "./form.model";

export interface IFormSchema {
  title: string;
  questions: Array<{
    kind: EQuestionTypes;
    questionRef: mongoose.Types.ObjectId;
  }>;
  status: EFormStatus;
  headerImg: string;
}

export interface IWDFormSchema extends Partial<IFormSchema> {
  title: string;
  questions: Array<{
    kind: EQuestionTypes;
    questionRef: mongoose.Types.ObjectId;
  }>;
}

export interface IFormLeanDoc extends IFormSchema, IModelDefaults {}
