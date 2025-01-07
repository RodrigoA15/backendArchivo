import { Request, Response, NextFunction } from "express";
import { InspectionService } from "../../../services/files/Inspections/inspections.service";
import { Inspection } from "../../../interfaces/inspection.interface";
import { InspectionDto } from "../../../dtos/Inspections.dto";

export class InspectionController {
  private inspectionService = new InspectionService();

  public getInspections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inspections: Inspection[] =
        await this.inspectionService.getInspections();
      res.status(200).json(inspections);
    } catch (error) {
      next(error);
    }
  };

  public createInspections = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inspectionData: InspectionDto = req.body;
      const newInspection = await this.inspectionService.createInspections(
        inspectionData
      );

      res.status(200).json(newInspection);
    } catch (error) {
      next(error);
    }
  };
}
