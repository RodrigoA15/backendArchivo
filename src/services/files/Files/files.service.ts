import { HttpException } from "../../../exceptions/HttpException";
import { Files } from "../../../interfaces/files.interface";
import { FileRepository } from "../../../repositories/files/Files/file.repository";
import { isEmpty } from "../../../utils/util";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateTicketDto } from "../../../dtos/UpdateTicket.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";
import { UpdateResult } from "mongoose";
import { mongo } from "mongoose";
import { UpdateStatusDeleveryDto } from "../../../dtos/UpdateStatusDelevery";

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

  public async getUploadFiles(state: string): Promise<Files[]> {
    if (isEmpty(state)) throw new HttpException(400, "Bad request");

    const fileStatusData = await this.fileRepository.getUploadFiles(state);

    if (isEmpty(fileStatusData))
      throw new HttpException(404, "Files not found");

    return fileStatusData;
  }

  public async assignedLawyer(
    updatedData: UpdateFileDto
  ): Promise<UpdateResult> {
    if (isEmpty(updatedData)) throw new HttpException(400, "Bad request");
    return this.fileRepository.assignedLawyer(updatedData);
  }

  public async getFilesProcessed(): Promise<Files[]> {
    const processed = await this.fileRepository.getFilesProcessed();

    if (isEmpty(processed))
      throw new HttpException(404, "Files processed not found");

    return processed;
  }

  public async updateFileByTicket(
    updateData: UpdateTicketDto[]
  ): Promise<mongo.BulkWriteResult> {
    if (isEmpty(updateData)) throw new HttpException(400, "Bad request");

    return this.fileRepository.updateFileByTicket(updateData);
  }

  public async updateStatusDelevery(
    updateData: UpdateStatusDeleveryDto
  ): Promise<UpdateResult> {
    if (isEmpty(updateData)) throw new HttpException(400, "Bad request");
    return this.fileRepository.updateStatusDelevery(updateData);
  }

  public async getInfoByTicketNumber(ticket_number: string): Promise<Files[]> {
    if (isEmpty(ticket_number)) throw new HttpException(400, "Bad request");
    const infoFile = await this.fileRepository.getInfoByTicketNumber(
      ticket_number
    );

    if (isEmpty(infoFile)) throw new HttpException(404, "Not found File");

    return infoFile;
  }
}
