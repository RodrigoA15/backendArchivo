import { model, Schema } from "mongoose";
import { Resolutions } from "../interfaces/resolutions.interface";

const ResolutionsSchema = new Schema<Resolutions>(
  {
    resolution_number: { type: String, required: true, unique: true },
    resolution_date: { type: Date, required: true },
    resolution_type: { type: String, required: true },
    file_id: { type: Schema.Types.ObjectId, ref: "files", required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<Resolutions>("Resolutions", ResolutionsSchema);
