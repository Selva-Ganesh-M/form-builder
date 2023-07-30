import { IWDSt } from "./st.model.d";
import mongoose from "mongoose";

const stSchema = new mongoose.Schema<IWDSt>({
  question: {
    type: String,
    required: [true, "Short text question must have question field"],
  },
  answer: {
    type: String,
    default: "",
  },
});

export const stModel = mongoose.model("StQ", stSchema);

type TStModel = typeof stModel;
export interface IStModel extends TStModel {}
