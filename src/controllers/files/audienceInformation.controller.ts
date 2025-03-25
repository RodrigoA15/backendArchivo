import { NextFunction, Request, Response } from "express";
import { AudiencesService } from "../../services/files/audienceInformation.service";

export class AudienceController {
  private audienceService = new AudiencesService();
  public getAudienceInformation = async (req: Request, res: Response) => {
    try {
      const { numero_comparendo } = req.body;
      const { status_digitalized } = req.params;
      const audienceInformation =
        await this.audienceService.getAudienceInformation(
          numero_comparendo,
          status_digitalized
        );
      res.status(200).json(audienceInformation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  public getAllAudienceInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { numero_comparendo } = req.body;
      const audienceInformation =
        await this.audienceService.getAllAudienceInformation(numero_comparendo);

      res.status(200).json(audienceInformation);
    } catch (error) {
      next(error);
    }
  };
}
