import mongoose from "mongoose";

export interface EvidenceFile {
  url_evidence: string;
  consecutive: number;
  id_file: mongoose.Schema.Types.ObjectId;
}
