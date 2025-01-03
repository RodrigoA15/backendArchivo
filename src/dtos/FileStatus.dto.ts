import { IsNotEmpty, IsString } from "class-validator";

export class FileStatusDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
