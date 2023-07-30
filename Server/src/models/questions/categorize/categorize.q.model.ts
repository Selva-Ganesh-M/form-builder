import { IWDCategorizeQ } from "./categorize.q.model.d";
import mongoose from "mongoose";

const categorizeQSchema = new mongoose.Schema<IWDCategorizeQ>(
  {
    question: {
      type: String,
      required: [true, "categorizedQ must have question attribute."],
    },
    expectedSolution: {
      type: [
        {
          _id: false,
          category: {
            type: String,
            required: [
              true,
              "every categorized set must have a category name.",
            ],
          },
          items: {
            type: [String],
            required: [
              true,
              "every categorized set must contain at least on item.",
            ],
          },
        },
      ],
      required: true,
      validate: {
        validator: (expectedSolution: Array<any>) => expectedSolution.length,
        message: (data) => "expected solution can't be empty",
      },
    },
    currentSolution: {
      type: [
        {
          _id: false,
          category: {
            type: String,
            required: [
              true,
              "every categorized set must have a category name.",
            ],
          },
          items: {
            type: [String],
            required: [
              true,
              "every categorized set must contain at least on item.",
            ],
          },
        },
      ],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "CategorizeQ",
    },
  },
  {
    timestamps: true,
  }
);

export const CategorizeQModel = mongoose.model(
  "CategorizeQ",
  categorizeQSchema
);

export type TCategorizeQModel = typeof CategorizeQModel;
export interface ICategorizeQModel extends TCategorizeQModel {}
