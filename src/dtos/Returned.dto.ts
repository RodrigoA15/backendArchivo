import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { Schema } from "mongoose";

export class ReturnedDto {
  @IsNotEmpty()
  @IsString()
  user_returned: string;

  @IsNotEmpty()
  @IsDateString()
  date_returned: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message:
      "La observación debe tener una longitud igual o mayor a 10 caracteres",
  })
  observation: string;

  @IsNotEmpty()
  @IsMongoId()
  id_file: Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  id_lawyer: Schema.Types.ObjectId;
}
