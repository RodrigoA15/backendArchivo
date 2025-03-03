import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { EvidenceFile } from "../interfaces/evidenceFile.interface";

const EvidenceFileSchema = new Schema<EvidenceFile>(
  {
    url_evidence: { type: String, required: true },
    consecutive: { type: Number, required: true },
    id_file: { type: mongoose.Schema.Types.ObjectId, required: true },
    file_type: {
      type: String,
      required: true,
      enum: ["Sin procesar", "Entregado", "Procesado"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<EvidenceFile>("EvidenceFile", EvidenceFileSchema);
