import { Request, Response, NextFunction } from "express";
import { FileStatus } from "../../../interfaces/fileStatusType.interface";
import fileStatusService from "../../../services/files/FileStatus/fileStatus.service";
import { FileStatusDto } from "../../../dtos/FileStatus.dto";

class FileStatusTypeController {
  public fileStatusService = new fileStatusService();

  public getFileStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fileStatusData: FileStatus[] =
        await this.fileStatusService.getFileStatus();

      res.status(200).json(fileStatusData);
    } catch (error) {
      next(error);
    }
  };

  public createFileStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fileStatusData: FileStatusDto = req.body;
      const newFileStatus: FileStatus =
        await this.fileStatusService.createFileStatus(fileStatusData);
      res.status(200).json(newFileStatus);
    } catch (error) {
      next(error);
    }
  };

  public getStatusByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name: string = req.params.name;
      const statusData = await this.fileStatusService.getFileStatusByName(name);
      res.status(200).json(statusData);
    } catch (error) {
      next(error);
    }
  };
}

export default FileStatusTypeController;
