import { Request, Response, NextFunction } from "express";
import { TypeValidationService } from "../../../services/files/TypeValidationFile/typeValidation.service";
import { TypeValidationFileDto } from "../../../dtos/TypeValidationFile.dto";

export class TypeValidationController {
  private typeValidationService = new TypeValidationService();

  public getTypeValidations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responseType =
        await this.typeValidationService.getTypeValidations();
      res.status(200).json(responseType);
    } catch (error) {
      next(error);
    }
  };

  public createTypeValidations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const typeValidationData: TypeValidationFileDto = req.body;
      await this.typeValidationService.createTypeValidations(
        typeValidationData
      );

      res.status(200).json({ message: "Created" });
    } catch (error) {
      next(error);
    }
  };
}
