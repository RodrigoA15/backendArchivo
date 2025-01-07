import { FilesDto } from "../../../dtos/Files.dto";
import { Files } from "../../../interfaces/files.interface";
import fileModel from "../../../schemas/Files.schema";

export class FileRepository {
  private file = fileModel;

  public async getFiles(): Promise<Files[]> {
    return this.file.find();
  }

  public async createFiles(filesData: FilesDto): Promise<Files> {
    return new this.file(filesData).save();
  }
}
