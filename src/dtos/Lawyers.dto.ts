import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateLawyerDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1000, {
    message:
      "The identification number must be greater than or equal to 4 characters.",
  })
  public identification: number;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10000000, {
    message: "The phone number must be greater than or equal to 8 characters.",
  })
  @Max(9999999999, {
    message: "The phone number must be less than or equal to 10 characters.",
  })
  public phone: number;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsBoolean()
  public state: boolean;
}
