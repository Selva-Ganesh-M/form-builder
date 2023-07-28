import { ICategorizeQ } from "./categorize.q.model.d";
import { EQuestionType } from "./../question.model.d";
import { EQuestionType } from "../question.model";
import { IModelDefaults } from "../../model";

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

export interface ICategorizeQLean extends ICategorizeQ, IModelDefaults {}
