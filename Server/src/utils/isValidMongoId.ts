import mongoose from "mongoose";

export default (id: mongoose.Types.ObjectId | string): boolean => {
  return mongoose.isValidObjectId(id);
};
