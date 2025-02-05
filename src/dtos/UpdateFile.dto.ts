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
  @IsInt()
  pages: Number;

  @IsOptional()
  @IsString()
  observation?: String;

  @IsOptional()
  @IsMongoId()
  inspection_id: String;
}
