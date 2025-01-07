import { NextFunction, Request, Response } from "express";
import { FilesService } from "../../../services/files/Files/files.service";
import { FilesDto } from "../../../dtos/Files.dto";

export class FilesController {
  private filesService = new FilesService();

  public getFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesData = await this.filesService.getFiles();
      res.status(200).json(filesData);
    } catch (error) {
      next(error);
    }
  };

  public createFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filesData: FilesDto = req.body;
      const newFiles = await this.filesService.createFiles(filesData);

      res.status(200).json(newFiles);
    } catch (error) {
      next(error);
    }
  };
}
