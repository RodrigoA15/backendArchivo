import { IsMongoId, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  _id: string[];

  @IsOptional()
  @IsMongoId()
  lawyer_id: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
