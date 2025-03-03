import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UpdateStatusDeleveryDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  _id: string;

  @IsNotEmpty()
  @IsString()
  delivery_validation: string;

  @IsNotEmpty()
  @IsString()
  date_validation: string;
}
