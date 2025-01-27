import mongoose from "mongoose";

export interface ValidationFile {
  validation_date: Date;
  status: string;
  assigned_id: mongoose.Schema.Types.ObjectId;
  type_validation_id: mongoose.Schema.Types.ObjectId;
}
