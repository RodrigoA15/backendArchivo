import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UpdateFileDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsMongoId()
  id_lawyer: string;

  @IsNotEmpty()
  @IsString()
  status_file: string; // Enum con los posibles estados: 'Pendiente asignacion', 'Asignado', 'Entregado archivo'.
}
