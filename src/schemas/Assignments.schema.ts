import { Schema, model } from "mongoose";
import { Assignments } from "../interfaces/assignments.interface";

const AssignmentsSchema = new Schema<Assignments>({
  assigned_date: { type: Date, required: true },
  active: { type: Boolean, required: true },
  observation: { type: String },
  user_assigns: { type: String, required: true },
  lawyer_id: {
    type: Schema.Types.ObjectId,
    ref: "Lawyer",
  },
  file_id: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
});

export default model<Assignments>("Assignments", AssignmentsSchema);
