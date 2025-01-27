import { IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator";
export class ValidationFileDto {
  @IsNotEmpty()
  @IsDateString()
  validation_date: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsMongoId()
  assigned_id: string;

  @IsNotEmpty()
  type_validation_id: string;
}
