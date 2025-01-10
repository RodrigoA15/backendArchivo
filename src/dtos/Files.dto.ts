import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class FilesDto {
  @IsNotEmpty()
  @IsString()
  ticket_number: string;

  @IsNotEmpty()
  @IsDateString()
  ticket_date: Date;

  @IsNotEmpty()
  @IsString()
  violation: string;

  @IsNotEmpty()
  @IsString()
  ticket_status: string;

  @IsNotEmpty()
  @IsDateString()
  audience_date: Date;

  @IsNotEmpty()
  @IsNumber()
  audience_hours: number;

  @IsNotEmpty()
  @IsString()
  audience_type: string;

  @IsOptional()
  @IsDateString()
  delevery_date?: Date;

  @IsOptional()
  @IsDateString()
  departure_date?: Date;

  @IsNotEmpty()
  @IsNumber()
  pages: number;

  @IsNotEmpty()
  @IsBoolean()
  CD: boolean;

  @IsNotEmpty()
  @IsBoolean()
  license: boolean;

  @IsNotEmpty()
  @IsBoolean()
  digitized: boolean;

  @IsOptional()
  @IsMongoId()
  id_lawyer?: string;

  @IsNotEmpty()
  @IsMongoId()
  id_file_status: string;
}
