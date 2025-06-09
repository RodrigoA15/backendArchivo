import mongoose from "mongoose";

export interface Resolutions {
  resolution_number: string;
  resolution_date: Date;
  resolution_type: string;
  file_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
}
