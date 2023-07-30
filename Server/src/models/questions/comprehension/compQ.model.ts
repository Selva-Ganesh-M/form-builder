import { IWDCompQ } from "./compQ.model.d";
import mongoose from "mongoose";

export enum ECompQTypes {
  stQ = "stQ",
  Mcq = "Mcq",
  Mca = "Mca",
}

const compQSchema = new mongoose.Schema<IWDCompQ>({
  image: {
    type: String,
    default: "",
  },
  question: {
    type: String,
    required: [true, "question is required to create compQ"],
  },
  compQuestions: {
    type: [
      {
        kind: {
          type: String,
          enum: ECompQTypes,
        },
        questionRef: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: "compQuestions.kind",
        },
      },
    ],
    validate: (compQArray: Array<string>) => compQArray.length > 0,
  },
});

export const CompQModel = mongoose.model("CompQ", compQSchema);
type TCompQModel = typeof CompQModel;
export interface ICompQModel extends TCompQModel {}
