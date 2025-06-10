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
  @IsString()
  audience_type: string;

  @IsOptional()
  @IsString()
  delivery_validation?: string;

  @IsNotEmpty()
  @IsDateString()
  date_delivery: Date;

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

  @IsNotEmpty()
  @IsNumber()
  offender_identification: number;

  @IsNotEmpty()
  @IsString()
  offender_name: string;

  @IsNotEmpty()
  @IsString()
  offender_last_name: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsNotEmpty()
  @IsString()
  status_file: string;

  @IsOptional()
  @IsMongoId()
  inspection_id: string;

  @IsMongoId()
  type_file_id: string;

  @IsNotEmpty({ message: "User ID is required" })
  @IsMongoId()
  user_id: string;
}
