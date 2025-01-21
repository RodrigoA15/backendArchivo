import { Request, Response } from "express";
import { EvidenceFileRepository } from "../../../repositories/files/EvidenceFile/evidenceFile.repository";
import { EvidenceFile } from "../../../interfaces/evidenceFile.interface";
import { EvidenceFilDto } from "../../../dtos/EvidenceFile.dto";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";
export class EvidenceFileService {
  private evidenceRepository = new EvidenceFileRepository();

  public async createEvidence(
    dataEvidence: EvidenceFilDto
  ): Promise<EvidenceFile> {
    return await this.evidenceRepository.createEvidence(dataEvidence);
  }

  public async importFile(req: Request, res: Response): Promise<any> {
    return await this.evidenceRepository.importFile(req, res);
  }

  public async getFile(id: string): Promise<any> {
    if (isEmpty(id)) throw new HttpException(400, "Bad request");

    return this.evidenceRepository.getFile(id)
  }
}
