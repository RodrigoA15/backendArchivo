import fileStatusModel from "../../../schemas/FileStatusType.schema";
import { FileStatus } from "../../../interfaces/fileStatusType.interface";
import { FileStatusDto } from "../../../dtos/FileStatus.dto";

class FileStatusType {
  public fileStatus = fileStatusModel;

  public async getFileStatus(): Promise<FileStatus[]> {
    return this.fileStatus.find();
  }

  public async createFileStatus(
    dataFileStatus: FileStatusDto
  ): Promise<FileStatus> {
    return new this.fileStatus(dataFileStatus).save();
  }
}

export default FileStatusType;
