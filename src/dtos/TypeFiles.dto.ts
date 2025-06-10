import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TypeFilesDto {
  @IsNotEmpty()
  @IsString()
  name_type: string;

  @IsNotEmpty()
  @IsString()
  value_qx: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
