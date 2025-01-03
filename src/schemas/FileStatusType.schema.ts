import { model, Schema } from "mongoose";
import { FileStatus } from "../interfaces/fileStatusType.interface";

const fileStatusType = new Schema<FileStatus>(
  {
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<FileStatus>("FileStatusType", fileStatusType);
