import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { Files } from "../interfaces/files.interface";

const files = new Schema<Files>(
  {
    ticket_number: {
      type: String,
      required: true,
      unique: [true, "Número comparendo ya registrado"],
    },
    ticket_date: { type: Date, required: true },
    violation: { type: String, required: true },
    ticket_status: { type: String, required: true },
    resolution_date: { type: Date, required: true },
    resolution_number: { type: String, required: true },
    audience_type: { type: String, required: true },
    delevery_date: { required: true, type: Date },
    departure_date: { type: Date, required: true },
    pages: { type: Number, required: true },
    CD: { type: Boolean, required: true },
    license: { type: Boolean, required: true },
    digitized: { type: Boolean, required: true },
    offender_identification: { type: Number, required: true },
    offender_name: { type: String, required: true },
    observation: { type: String },
    status_file: {
      type: String,
      enum: ["Pendiente asignacion", "Pendiente validacion","Asignado", "Entregado archivo"],
      required: true,
    },
    id_lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },
  },

  { timestamps: true }
);

export default model<Files>("File", files);
