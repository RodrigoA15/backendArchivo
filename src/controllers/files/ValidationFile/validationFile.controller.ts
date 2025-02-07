import { Request, Response, NextFunction } from "express";
import { ValidationFileService } from "../../../services/files/ValidationFile/validationFile.service";
import { ValidationFileDto } from "../../../dtos/ValidationFile.dto";

export class ValidationFileController {
  public validationFileService = new ValidationFileService();

  public getValidationFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataValidationFile =
        await this.validationFileService.getValidationFiles();
      res.status(200).json(dataValidationFile);
    } catch (error) {
      next(error);
    }
  };

  public createValidationFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataValidationFile = req.body;

      await this.validationFileService.createValidationFiles(
        dataValidationFile
      );

      res.status(200).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
