import fileStatusRepository from "../../../repositories/files/FileStatus/fileStatus.repository";
import { FileStatus } from "../../../interfaces/fileStatusType.interface";
import { FileStatusDto } from "../../../dtos/FileStatus.dto";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";

class FileStatusType {
  public fileStatusRepository = new fileStatusRepository();

  public async getFileStatus(): Promise<FileStatus[]> {
    const fileStatusData: FileStatus[] =
      await this.fileStatusRepository.getFileStatus();

    if (fileStatusData.length > 0) {
      return fileStatusData;
    }

    throw new Error("Not found File Status File");
  }

  public createFileStatus(dataFileStatus: FileStatusDto): Promise<FileStatus> {
    if (isEmpty(dataFileStatus)) throw new Error("File status type is not empty");

    return this.fileStatusRepository.createFileStatus(dataFileStatus);
  }
}

export default FileStatusType;
