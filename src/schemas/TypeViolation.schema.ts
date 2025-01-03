import { Schema, model } from "mongoose";
import { TypeViolation } from "../interfaces/typeViolation.interface";

const typeViolationSchema = new Schema<TypeViolation>(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<TypeViolation>("TypeViolation", typeViolationSchema);
