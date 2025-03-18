import { model, Schema } from "mongoose";
import { ReturnedInterface } from "../interfaces/returned.interface";

const ReturnedSchema = new Schema<ReturnedInterface>(
  {
    user_returned: { type: String, required: true },
    date_returned: { type: Date, required: true },
    observation: { type: String, required: true },
    id_file: { type: Schema.Types.ObjectId, ref: "files" },
    id_lawyer: { type: Schema.Types.ObjectId, ref: "lawyers" },
  },
  { timestamps: true }
);

export default model<ReturnedInterface>("Returned", ReturnedSchema);
