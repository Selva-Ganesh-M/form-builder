import { EQuestionType } from "./../question.model.d";
import { EQuestionType } from "../question.model";

export interface ICategorizeQ {
  categorized: Array<{
    category: string;
    items: Array<string>;
  }>;
  unCategorized: Array<string>;
  type: EQuestionType.categorize;
}

export interface IWDCategorizeQ extends Partial<ICategorizeQ> {
  categorized: Array<{
    category: string;
    items: Array<string>;
  }>;
  unCategorized: Array<string>;
}
