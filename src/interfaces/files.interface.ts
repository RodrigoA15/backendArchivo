import mongoose from "mongoose";

export interface Files {
  ticket_number: string;
  ticket_date: Date;
  violation: string;
  ticket_status: string;
  audience_date: Date;
  audience_hours: number;
  audience_type: string;
  delevery_date: Date;
  departure_date: Date;
  pages: number;
  CD: boolean;
  license: boolean;
  digitized: boolean;
  id_type_violation: mongoose.Schema.Types.ObjectId;
  id_lawyer: mongoose.Schema.Types.ObjectId;
  id_file_status: mongoose.Schema.Types.ObjectId;
}
