import { model, Schema } from "mongoose";
import { ValidationFile } from "../interfaces/validationFile.interface";

const ValidationFileSchema = new Schema<ValidationFile>(
  {
    validation_date: { type: Date, required: true },
    status: { type: String, required: true },
    valid_user: { type: String, required: true },
    assigned_id: { type: Schema.Types.ObjectId, ref: "Assignments" },
    type_validation_id: {
      type: [Schema.Types.ObjectId],
      ref: "Type_validation_files",
    },
  },
  {
    timestamps: true,
  }
);

export default model<ValidationFile>("ValidationFiles", ValidationFileSchema);
