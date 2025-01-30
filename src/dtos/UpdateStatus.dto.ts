import { IsMongoId, IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  _id: string[];

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
