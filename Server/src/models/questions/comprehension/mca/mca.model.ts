import { IWDMca } from "./mca.model.d";
import { customError } from "../../../../utils/customError";
import mongoose from "mongoose";

const mcaSchema = new mongoose.Schema<IWDMca<string | number>>({
  question: {
    type: String,
    required: [true, "mca must have question"],
  },
  options: {
    type: [],
    validate: {
      validator: function (optionsList: any[]) {
        return optionsList.length > 0;
      },
      message: "mca options can't be empty",
    },
  },
  answers: {
    type: [
      {
        type: mongoose.SchemaTypes.Mixed,
      },
    ],
    default: [],
  },
});

mcaSchema.pre("save", async function (next) {
  let self = this;
  function isInAns(item: string | number) {
    return self.options.includes(item);
  }
  if (this.answers && !this.answers.every((item) => isInAns(item))) {
    return next(
      new customError(400, "create mcq failed: answers not in options")
    );
  }
  next();
});

export const McaModel = mongoose.model("Mca", mcaSchema);

type TMcaModel = typeof McaModel;
export interface IMcaModel extends TMcaModel {}
