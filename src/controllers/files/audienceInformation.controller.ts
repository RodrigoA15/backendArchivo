import { NextFunction, Request, Response } from "express";
import { AudiencesService } from "../../services/files/audienceInformation.service";

export class AudienceController {
  private audienceService = new AudiencesService();
  public getAudienceInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { numero_comparendo, status_digitalized, ticket_status } = req.body;
      const audienceInformation =
        await this.audienceService.getAudienceInformation(
          numero_comparendo,
          status_digitalized,
          ticket_status
        );
      res.status(200).json(audienceInformation);
    } catch (error) {
      next(error);
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
