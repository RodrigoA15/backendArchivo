import mongoose from "mongoose";
export interface Assignments {
  assigned_date: Date;
  active: boolean;
  observation: string;
  lawyer_id: mongoose.Schema.Types.ObjectId;
  file_id: mongoose.Schema.Types.ObjectId;
}
