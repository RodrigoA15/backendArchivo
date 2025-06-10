import mongoose from "mongoose";

export interface Files {
  ticket_number: string;
  ticket_date: Date;
  violation: string;
  ticket_status: string;
  audience_type: string;
  departure_date: Date;
  pages: number;
  CD: boolean;
  license: boolean;
  digitized: boolean;
  offender_identification: number;
  offender_name: string;
  offender_last_name: string;
  evidence_id: string;
  file_id: string;
  observation: string;
  status_file: string;
  date_delivery: Date;
  delivery_validation: string;
  inspection_id: mongoose.Schema.Types.ObjectId;
  type_file_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
}
