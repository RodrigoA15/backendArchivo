import { model, Schema } from "mongoose";
import { Inspection } from "../interfaces/inspection.interface";

const inspectionSchema = new Schema<Inspection>(
  {
    name_inspection: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<Inspection>("Inspection", inspectionSchema);
