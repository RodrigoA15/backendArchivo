import mongoose from "mongoose";

export interface Lawyers {
  identification: number;
  name: string;
  last_name: string;
  phone: number;
  email: string;
  state: boolean;
  inspection_id: mongoose.Schema.Types.ObjectId;
}
