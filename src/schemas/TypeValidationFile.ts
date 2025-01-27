import { Schema, model } from "mongoose";
import { TypeValidationFile } from "../interfaces/typevalidationFile.interface";

const TypeValidationSchema = new Schema<TypeValidationFile>(
  {
    description_status: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<TypeValidationFile>(
  "Type_validation_files",
  TypeValidationSchema
);
