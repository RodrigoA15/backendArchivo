import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateFileDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsMongoId()
  id_lawyer?: string;

  @IsNotEmpty()
  @IsString()
  status_file: string; // Enum con los posibles estados: 'Pendiente asignacion', 'Asignado', 'Entregado archivo'.

  @IsOptional()
  @IsDateString()
  delevery_date?: Date;
}
