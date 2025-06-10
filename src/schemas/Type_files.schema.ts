import { model, Schema } from "mongoose";
import { TypeFiles } from "../interfaces/typeFiles.interface";

const TypeFilesSchema = new Schema<TypeFiles>(
  {
    name_type: {
      type: String,
      required: true,
      unique: [true, "Tipo de archivo ya registrado"],
    },

    value_qx: {
      type: String,
      required: true,
      unique: [true, "Valor QX ya registrado"],
    },

    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("type_files", TypeFilesSchema);
