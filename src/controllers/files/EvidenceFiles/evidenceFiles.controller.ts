import { NextFunction, Request, Response } from "express";
import { EvidenceFileService } from "../../../services/files/EvidenceFile/evidenceFile.service";
import { EvidenceFilDto } from "../../../dtos/EvidenceFile.dto";

export class EvidenceFileController {
  private evidenceService = new EvidenceFileService();

  public createEvidence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataEvidence = req.body;
      const newEvidence = await this.evidenceService.createEvidence(
        dataEvidence
      );

      res.status(200).json(newEvidence);
    } catch (error) {
      next(error);
    }
  };

  public importFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newFile = await this.evidenceService.importFile(req, res);

      res.status(200).json({ message: "Created", data: newFile });
    } catch (error) {
      next(error);
    }
  };

  public getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const file = await this.evidenceService.getFile(id);

      res.sendFile(file.url_evidence);
    } catch (error) {
      next(error);
    }
  };
}
