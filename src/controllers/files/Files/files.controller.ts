import { NextFunction, Request, Response } from "express";
import { FilesService } from "../../../services/files/Files/files.service";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";
import { UpdateTicketDto } from "../../../dtos/UpdateTicket.dto";
import { UpdateStatusDeleveryDto } from "../../../dtos/UpdateStatusDelevery";

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

  public getUploadFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { state } = req.params;
      const fileStatusData = await this.filesService.getUploadFiles(state);

      res.status(200).json(fileStatusData);
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

  public getFilesProcessed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const processedFile = await this.filesService.getFilesProcessed();

      res.status(200).json(processedFile);
    } catch (error) {
      next(error);
    }
  };

  public updateFileByTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateData: UpdateTicketDto[] = req.body;
      await this.filesService.updateFileByTicket(updateData);

      res.status(200).json({ message: "File updated" });
    } catch (error) {
      next(error);
    }
  };

  public updateStatusDelevery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateData: UpdateStatusDeleveryDto = req.body;
      await this.filesService.updateStatusDelevery(updateData);
      res.status(200).json({ message: "Status delevery updated" });
    } catch (error) {
      next(error);
    }
  };

  public getInfoByTicketNumber = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { ticket_number } = req.params;
      const infoFile = await this.filesService.getInfoByTicketNumber(
        ticket_number
      );

      res.status(200).json(infoFile);
    } catch (error) {
      next(error);
    }
  };
}
