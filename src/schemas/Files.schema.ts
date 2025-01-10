import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { Files } from "../interfaces/files.interface";

const files = new Schema<Files>(
  {
    ticket_number: { type: String, required: true, unique: true },
    ticket_date: { type: Date, required: true },
    violation: { type: String, required: true },
    ticket_status: { type: String, required: true },
    audience_date: { type: Date, required: true },
    audience_hours: { type: Number, required: true },
    audience_type: { type: String, required: true },
    delevery_date: { type: Date, required: true },
    departure_date: { type: Date, required: true },
    pages: { type: Number, required: true },
    CD: { type: Boolean, required: true },
    license: { type: Boolean, required: true },
    digitized: { type: Boolean, required: true },
    id_lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
    id_file_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FileStatusType",
      required: true,
    },
  },

  { timestamps: true }
);

export default model<Files>("File", files);
