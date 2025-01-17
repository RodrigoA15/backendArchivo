import { EvidenceFileRepository } from "../../../repositories/files/EvidenceFile/evidenceFile.repository";
import { EvidenceFile } from "../../../interfaces/evidenceFile.interface";
import { EvidenceFilDto } from "../../../dtos/EvidenceFile.dto";
import { IsAny } from "typeorm";
import { Request, Response } from "express";
export class EvidenceFileService {
  private evidenceRepository = new EvidenceFileRepository();

  public async createEvidence(
    dataEvidence: EvidenceFilDto
  ): Promise<EvidenceFile> {
    return await this.evidenceRepository.createEvidence(dataEvidence);
  }

  public async importFile(req: Request, res:Response) : Promise<any> {
    return await this.evidenceRepository.importFile(req, res);
  }
}
