import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class EvidenceFilDto {
  @IsNotEmpty()
  @IsString()
  url_evidence: string;

  @IsNotEmpty()
  @IsString()
  upload_user: string;

  @IsNotEmpty()
  @IsMongoId()
  id_file: string;

  @IsNotEmpty()
  @IsString()
  file_type: string;
}
