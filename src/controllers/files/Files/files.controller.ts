import { NextFunction, Request, Response } from "express";
import { FilesService } from "../../../services/files/Files/files.service";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";

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

  public getFilesByState = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const state = req.params.name;
    try {
      const statusData = await this.filesService.getFilesByState(state);
      res.status(200).json(statusData);
    } catch (error) {
      next(error);
    }
  };

  public assignedLawyer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filesData: UpdateFileDto = req.body;
      const newFiles = await this.filesService.assignedLawyer(filesData);
      res.status(200).json(newFiles);
    } catch (error) {
      next(error);
    }
  };
}
