import { ValidationFileRepository } from "../../../repositories/files/ValidationFile/validationFile.repository";
import { ValidationFile } from "../../../interfaces/validationFile.interface";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";
import { ValidationFileDto } from "../../../dtos/ValidationFile.dto";

export class ValidationFileService {
  private validationFileRepository = new ValidationFileRepository();

  public async getValidationFiles(): Promise<ValidationFile[]> {
    const validationFile =
      await this.validationFileRepository.getValidationFiles();

    if (isEmpty(validationFile))
      throw new HttpException(404, "Files not found");

    return validationFile;
  }

  public async createValidationFiles(
    validationData: ValidationFile
  ): Promise<ValidationFile[]> {
    if (isEmpty(validationData)) throw new HttpException(400, "Bad request");

    return this.validationFileRepository.createValidationFiles(validationData);
  }
}
