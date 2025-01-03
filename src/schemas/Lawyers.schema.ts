import { model, Schema } from "mongoose";
import { Lawyers } from "../interfaces/lawyers.interface";

const lawyersSchema = new Schema<Lawyers>({
  identification: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
  email: { type: String, required: true },
  state: { type: Boolean, required: true },
});

export default model<Lawyers>("Lawyer", lawyersSchema);
