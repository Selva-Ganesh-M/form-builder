export enum EQuestionType {
  categorize = "categorize",
  cloze = "cloze",
  comprehension = "comprehension",
}

export interface IQuestionSchema {
  questionType: EQuestionType;
  questionRefId: string;
}

export interface IWDQuestionSchema extends Partial<IQuestionSchema> {
  questionType: EQuestionType;
  questionRefId: string;
}
