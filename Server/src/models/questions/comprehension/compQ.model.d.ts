import { ECompQTypes } from "./compQ.model";
export interface ICompQ {
  question: String;
  image: String;
  compQuestions: Array<{
    kind: ECompQTypes;
    questionRef: string;
  }>;
}

export interface IWDCompQ extends Partial<ICompQ> {
  question: String;
  compQuestions: Array<{
    kind: ECompQTypes;
    questionRef: string;
  }>;
}
