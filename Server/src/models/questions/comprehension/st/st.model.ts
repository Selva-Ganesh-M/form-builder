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

export const StModel = mongoose.model("StQ", stSchema);

type TStModel = typeof StModel;
export interface IStModel extends TStModel {}
