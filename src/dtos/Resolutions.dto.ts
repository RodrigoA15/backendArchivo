import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";

export class ResolutionsDto {
  @IsNotEmpty()
  @IsMongoId()
  resolution_number: string;

  @IsNotEmpty()
  @IsDate()
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
