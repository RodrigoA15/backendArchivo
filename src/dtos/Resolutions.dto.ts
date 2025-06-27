import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class ResolutionsDto {
  @IsNotEmpty()
  @IsString()
  resolution_number: string;

  @IsNotEmpty()
  @IsDateString()
  resolution_date: Date;

  @IsNotEmpty()
  resolution_type: string;

  @IsNotEmpty()
  @IsMongoId()
  file_id: string;

  @IsNotEmpty()
  @IsMongoId()
  user_id: string;
}
