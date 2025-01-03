import { Request, Response } from "express";
import * as audienceInformationService from "../../services/files/audienceInformation.service";

class AudienceInformationController {
  constructor() {}
  async getAllAudienceInformation(req: Request, res: Response) {
    try {
      const audienceInformation =
        await audienceInformationService.getAllAudienceInformation(
          req.params.numero_comparendo
        );
      res.status(200).json(audienceInformation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

export default new AudienceInformationController();
