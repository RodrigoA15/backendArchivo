import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from "class-validator";

export class UpdateFileDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  _id: string;

  @IsOptional()
  @IsMongoId()
  id_lawyer?: string;

  @IsOptional()
  @IsString()
  status_file: string; // Enum con los posibles estados: 'Pendiente asignacion', 'Asignado', 'Entregado archivo'.

  @IsOptional()
  @IsDateString()
  delevery_date?: Date;

  @IsOptional()
  @IsDateString()
  departure_date: Date;

  @IsOptional()
  @IsInt()
  pages: Number;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsMongoId()
  inspection_id: string;

  @IsOptional()
  @IsString()
  resolution_date: Date;

  @IsOptional()
  @IsString()
  resolution_number: string;
}
