import { IWDCompQ } from "./compQ.model.d";
import mongoose from "mongoose";
import { McaModel } from "./mca/mca.model";
import { customError } from "../../../utils/customError";
import { McqModel } from "./mcq/mcq.model";
import { StModel } from "./st/st.model";

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
  compQuestions: [
    {
      _id: false,
      kind: {
        type: String,
        enum: ECompQTypes,
      },
      questionRef: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "compQuestions.kind",
      },
    },
  ],
});

compQSchema.pre("save", async function (next) {
  if (!(this.compQuestions.length > 0))
    throw new customError(
      400,
      "create compQ failed: compQuestions can't be empty"
    );
  const resPromises = this.compQuestions.map((q) => {
    let status = true;
    switch (q.kind) {
      case ECompQTypes.Mca:
        return McaModel.findById(q.questionRef).lean().exec();
      case ECompQTypes.Mcq:
        return McqModel.findById(q.questionRef).lean().exec();
      case ECompQTypes.stQ:
        return StModel.findById(q.questionRef).lean().exec();
    }
  });
  const res = await Promise.all(resPromises);
  if (!res.every((q) => q))
    next(
      new customError(400, "create cateQ failed: some subquestion not found")
    );

  next();
});

export const CompQModel = mongoose.model("CompQ", compQSchema);
type TCompQModel = typeof CompQModel;
export interface ICompQModel extends TCompQModel {}
