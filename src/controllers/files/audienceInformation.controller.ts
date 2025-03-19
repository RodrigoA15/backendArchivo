import { NextFunction, Request, Response } from "express";
import * as audienceInformationService from "../../services/files/audienceInformation.service";

class AudienceInformationController {
  constructor() {}
  async getAudienceInformation(req: Request, res: Response) {
    try {
      const { numero_comparendo } = req.body;
      const {status_digitalized} = req.params;
      const audienceInformation =
        await audienceInformationService.getAudienceInformation(
          numero_comparendo,
          status_digitalized
        );
      res.status(200).json(audienceInformation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getAllAudienceInformation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { numero_comparendo } = req.body;
      const audienceInformation =
        await audienceInformationService.getAllAudienceInformation(
          numero_comparendo
        );

      res.status(200).json(audienceInformation);
    } catch (error) {
      next(error);
    }
  }
}

export default new AudienceInformationController();
