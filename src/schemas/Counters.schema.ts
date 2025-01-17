import { Schema, model } from "mongoose";
import { EvidenceFile } from "../interfaces/counter.interface";

const EvidenceSchema = new Schema<EvidenceFile>({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true },
});

export default model<EvidenceFile>("Counters", EvidenceSchema);
