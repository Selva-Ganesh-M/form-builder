import { isNotEmpty } from "../../../utils/isNotEmpty";
import { EQuestionType } from "../question.model";
import { IWDCategorizeQ } from "./categorize.q.model.d";
import mongoose from "mongoose";

const categorizeQSchema = new mongoose.Schema<IWDCategorizeQ>(
  {
    categorized: {
      type: [
        {
          category: {
            type: String,
          },
          items: [
            {
              type: String,
            },
          ],
        },
      ],
      validate: [isNotEmpty, "Categories list can't be empty"],
    },
    unCategorized: {
      type: [
        {
          type: String,
        },
      ],
      validate: [isNotEmpty, "Category Items can't be empty"],
    },
    type: {
      type: String,
      default: EQuestionType.categorize,
    },
  },
  {
    timestamps: true,
  }
);

export const CategorizeQModel = mongoose.model("Categorize", categorizeQSchema);

export type TCategorizeQModel = typeof CategorizeQModel;
export interface ICategorizeQModel extends TCategorizeQModel {}
