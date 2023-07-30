import { ICategorizeQ } from "./categorize.q.model.d";
import { EQuestionType } from "./../question.model.d";
import { EQuestionType } from "../question.model";
import { IModelDefaults } from "../../model";

export interface ICategorizeQ {
  question: string;
  expectedSolution: Array<{
    category: string;
    items: Array<string>;
  }>;
  currentSolution: Array<{
    category: string;
    items: Array<string>;
  }>;
  type: EQuestionType.categorize;
  image: String;
}

export interface IWDCategorizeQ extends Partial<ICategorizeQ> {
  question: string;
  expectedSolution: Array<{
    category: string;
    items: Array<string>;
  }>;
}

export interface ICategorizeQLean extends ICategorizeQ, IModelDefaults {}
