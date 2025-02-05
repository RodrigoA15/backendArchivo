import { model, Schema } from "mongoose";
import { Lawyers } from "../interfaces/lawyers.interface";

const lawyersSchema = new Schema<Lawyers>(
  {
    identification: {
      type: Number,
      unique: [true, "Número de identificación ya registrado"],
      required: true,
    },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: {
      type: Number,
      unique: [true, "Número de celular ya registrado"],
      required: true,
    },
    email: { type: String, required: true },
    state: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<Lawyers>("Lawyer", lawyersSchema);
