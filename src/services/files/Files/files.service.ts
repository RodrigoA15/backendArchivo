import { HttpException } from "../../../exceptions/HttpException";
import { Files } from "../../../interfaces/files.interface";
import { FileRepository } from "../../../repositories/files/Files/file.repository";
import { isEmpty } from "../../../utils/util";
import { FilesDto } from "../../../dtos/Files.dto";

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
}
