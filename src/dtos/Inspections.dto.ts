import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InspectionDto {
  @IsNotEmpty()
  @IsString()
  name_inspection: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
