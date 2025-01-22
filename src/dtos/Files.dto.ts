import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
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
  resolution_date: Date;

  @IsNotEmpty()
  @IsString()
  resolution_number: number;

  @IsNotEmpty()
  @IsString()
  audience_type: string;

  @IsNotEmpty()
  @IsDateString()
  delevery_date: Date;

  @IsNotEmpty()
  @IsDateString()
  departure_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
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
  @IsString()
  status_file: string;

  @IsNotEmpty()
  @IsNumber()
  offender_identification: number;

  @IsNotEmpty()
  @IsString()
  offender_name: string;
}
