import { IsBoolean, IsNotEmpty, IsString, IsOptional } from "class-validator";
export class TypeValidationFileDto {
  @IsNotEmpty()
  @IsString()
  description_status: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
