import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class AssignmentsDto {
  @IsNotEmpty()
  @IsDateString()
  assigned_date: Date;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  observation: string;

  @IsNotEmpty()
  @IsString()
  user_assigns: string;

  @IsNotEmpty()
  @IsMongoId()
  lawyer_id: string;

  @IsNotEmpty()
  @IsMongoId()
  file_id: string;
}
