import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CounterDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  sequence_value: number;
}
