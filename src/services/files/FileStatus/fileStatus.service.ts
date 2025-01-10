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

  public async createFileStatus(
    dataFileStatus: FileStatusDto
  ): Promise<FileStatus> {
    if (isEmpty(dataFileStatus))
      throw new Error("File status type is not empty");

    return this.fileStatusRepository.createFileStatus(dataFileStatus);
  }

  public async getFileStatusByName(description: string): Promise<FileStatus[]> {
    if (isEmpty(description)) throw new HttpException(400, "Bad request");
    const statusData = await this.fileStatusRepository.getStatusByName(
      description
    );

    if (isEmpty(statusData))
      throw new HttpException(404, "File status not found");

    return statusData;
  }
}

export default FileStatusType;
