import { Schema, model } from "mongoose";
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
    resolution_date: { type: Date, default: null },
    resolution_number: { type: String, default: "0" },
    audience_type: { type: String, required: true },
    delevery_date: { required: true, type: Date },
    departure_date: { type: Date, required: true },
    pages: { type: Number, required: true },
    CD: { type: Boolean, required: true },
    license: { type: Boolean, required: true },
    offender_identification: { type: Number, required: true },
    offender_name: { type: String, required: true },
    offender_last_name: { type: String, required: true },
    evidence_id: { type: String },
    file_id: { type: String },
    type_resolution_id: { type: String },
    observation: { type: String },
    delivery_validation: { type: String, enum: ["S", "N"] },
    date_validation: { type: Date },
    status_file: {
      type: String,
      enum: [
        "Pendiente asignacion",
        "Pendiente validacion",
        "Pendiente proceso",
        "Asignado",
        "Entregado archivo",
      ],
      required: true,
    },
    inspection_id: {
      type: Schema.Types.ObjectId,
      ref: "Inspection",
    },
  },

  { timestamps: true }
);

export default model<Files>("File", files);
