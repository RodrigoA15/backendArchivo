import { IsDateString, IsNumber, IsString } from "class-validator";

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
  evidence_id: string;

  @IsString()
  type_resolution_id: string;

  @IsString()
  file_id: string;
}
