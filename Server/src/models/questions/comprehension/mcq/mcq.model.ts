import { customError } from "../../../../utils/customError";
import { IWDMcq } from "./mcq.model.d";
import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema<IWDMcq<string | number>>({
  question: {
    type: String,
    required: [true, "mcq must have question"],
  },
  options: {
    type: [],
    validate: {
      validator: function (optionsList: any[]) {
        return optionsList.length > 0;
      },
      message: "mcq options can't be empty",
    },
  },
  answer: {
    type: mongoose.SchemaTypes.Mixed,
  },
});

mcqSchema.pre("save", async function (next) {
  if (this.answer && !this.options.includes(this.answer)) {
    return next(
      new customError(400, "create mcq failed: answer not in options")
    );
  }
  next();
});

export const McqModel = mongoose.model("Mcq", mcqSchema);

type TMcqModel = typeof McqModel;
export interface IMcqModel extends TMcqModel {}
