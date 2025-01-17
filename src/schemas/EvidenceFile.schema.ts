import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { EvidenceFile } from "../interfaces/evidenceFile.interface";

const EvidenceFileSchema = new Schema<EvidenceFile>({
  url_evidence: { type: String, required: true },
  consecutive: { type: Number, required: true },
  id_file: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default model<EvidenceFile>("EvidenceFile", EvidenceFileSchema);
