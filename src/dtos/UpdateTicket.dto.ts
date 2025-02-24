import {
  IsArray,
  IsDateString,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateTicketDto {
  @IsString()
  ticket_number: string;

  @IsString()
  ticket_status: string;

  @IsDateString()
  resolution_date: string;

  @IsString()
  resolution_number: string;
}
