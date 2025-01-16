import mongoose from "mongoose";

export interface Files {
  ticket_number: string;
  ticket_date: Date;
  violation: string;
  ticket_status: string;
  audience_date: Date;
  audience_hours: number;
  audience_type: string;
  delevery_date?: Date;
  departure_date?: Date;
  pages: number;
  CD: boolean;
  license: boolean;
  digitized: boolean;
  status_file: string;
  id_lawyer?: mongoose.Schema.Types.ObjectId;
  offender_identification: number;
  offender_name: string;
}
