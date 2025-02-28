import mongoose from "mongoose";

export interface Files {
  ticket_number: string;
  ticket_date: Date;
  violation: string;
  ticket_status: string;
  resolution_date: Date;
  resolution_number: string;
  audience_type: string;
  delevery_date: Date;
  departure_date: Date;
  pages: number;
  CD: boolean;
  license: boolean;
  digitized: boolean;
  status_file: string;
  observation: string;
  offender_identification: number;
  offender_name: string;
  offender_last_name: string;
  evidence_id: string;
  file_id: string;
  type_resolution_id: string;
  inspection_id: mongoose.Schema.Types.ObjectId;
}
