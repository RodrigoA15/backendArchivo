import mongoose from "mongoose";

export interface EvidenceFile {
  url_evidence: string;
  consecutive: number;
  upload_user: string;
  id_file: mongoose.Schema.Types.ObjectId;
  file_type: string
}
