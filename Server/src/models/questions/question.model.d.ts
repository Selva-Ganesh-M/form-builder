export interface IQuestionSchema {
  questionType: EQuestionType;
  questionRefId: string;
}

export interface IWDQuestionSchema extends Partial<IQuestionSchema> {
  questionType: EQuestionType;
  questionRefId: string;
}
