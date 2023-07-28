import { IModelDefaults } from "../model";
import { EQuestionType } from "../questions/question.model";
import { EFormStatus } from "./form.model";

export interface IFormSchema {
  title: string;
  questions: Array<{
    questionId: string;
    questionType: EQuestionType;
  }>;
  status: EFormStatus;
  headerImg: string;
}

export interface IWDFormSchema extends Partial<IFormSchema> {
  title: string;
  questions: Array<{
    questionId: string;
    questionType: EQuestionType;
  }>;
}

export interface IFormLeanDoc extends IModelDefaults {}
