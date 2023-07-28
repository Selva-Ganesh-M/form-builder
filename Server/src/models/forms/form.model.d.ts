import { IModelDefaults } from "../model";
import { EFormStatus } from "./form.model";

export interface IFormSchema {
  title: string;
  questions: Array<string>;
  status: EFormStatus;
  headerImg: string;
}

export interface IFormLeanDoc extends IModelDefaults {}
