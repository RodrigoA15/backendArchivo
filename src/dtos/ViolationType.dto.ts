import { IsNotEmpty, IsString } from "class-validator";

export class ViolationType {
  @IsNotEmpty()
  @IsString()
  description: string;
}
