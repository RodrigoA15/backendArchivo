import { NextFunction, Request, Response } from "express";
import { TypeFilesService } from "../../../services/files/TypeFiles/typeFiles.service";
import { TypeFilesDto } from "../../../dtos/TypeFiles.dto";

export class TypeFilesController {
  private typeFilesService = new TypeFilesService();

  public getTypeFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responseType = await this.typeFilesService.getTypeFiles();
      res.status(200).json(responseType);
    } catch (error) {
      next(error);
    }
  };

  public createTypeFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const typeFileData: TypeFilesDto = req.body;
      const newTypeFile = await this.typeFilesService.createTypeFile(
        typeFileData
      );
      res.status(200).json(newTypeFile);
    } catch (error) {
      next(error);
    }
  };
}
