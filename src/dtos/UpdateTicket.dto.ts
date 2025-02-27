import {
  IsArray,
  IsDateString,
  IsNumber,
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

  @IsNumber()
  evidence_id: number;

  @IsString()
  type_resolution_id: string;
}
