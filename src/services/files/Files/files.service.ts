import { HttpException } from "../../../exceptions/HttpException";
import { Files } from "../../../interfaces/files.interface";
import { FileRepository } from "../../../repositories/files/Files/file.repository";
import { isEmpty } from "../../../utils/util";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";
import { UpdateResult } from "mongoose";

export class FilesService {
  private fileRepository = new FileRepository();

  public async getFiles(): Promise<Files[]> {
    const files: Files[] = await this.fileRepository.getFiles();

    if (isEmpty(files)) throw new HttpException(404, "Files not found");

    return files;
  }

  public async createFiles(fileData: FilesDto): Promise<Files> {
    if (isEmpty(fileData)) throw new HttpException(400, "Bad request");

    return this.fileRepository.createFiles(fileData);
  }

  public async getFilesByState(state: string): Promise<Files[]> {
    if (isEmpty(state)) throw new HttpException(400, "Bad request");

    const statusData = await this.fileRepository.getFilesByState(state);

    if (isEmpty(statusData)) throw new HttpException(404, "Files not found");

    return statusData;
  }

  public async assignedLawyer(
    updatedData: UpdateFileDto
  ): Promise<UpdateResult> {
    if (isEmpty(updatedData)) throw new HttpException(400, "Bad request");
    return this.fileRepository.assignedLawyer(updatedData);
  }
}
