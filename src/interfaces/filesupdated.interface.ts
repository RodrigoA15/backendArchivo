import mongoose from "mongoose";

export interface UpdatedFiles {
  _id: mongoose.Schema.Types.ObjectId;
  id_lawyer: mongoose.Schema.Types.ObjectId;
  status_file: string;
}
