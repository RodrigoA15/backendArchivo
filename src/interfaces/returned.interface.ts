import mongoose, { Document } from "mongoose";

export interface ReturnedInterface extends Document {
  user_returned: string;
  date_returned: Date;
  observation: string;
  id_file: mongoose.Schema.Types.ObjectId;
  id_lawyer: mongoose.Schema.Types.ObjectId;
}
