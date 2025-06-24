import { NextFunction, Request, Response } from "express";
import { ResolutionsDto } from "../../../dtos/Resolutions.dto";
import { ResolutionsService } from "../../../services/files/Resolutions/resolutions.service";

export class ResolutionController {
  private resolutionService = new ResolutionsService();

  public createResolution = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resolutionData: ResolutionsDto = req.body;
      const createdResolution = await this.resolutionService.createResolution(
        resolutionData
      );
      res.status(201).json({
        data: createdResolution,
        message: "Resolution created successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
