import { ValidationFileDto } from "../../../dtos/ValidationFile.dto";
import { ValidationFile } from "../../../interfaces/validationFile.interface";
import ValidationFileSchema from "../../../schemas/ValidationFile";

export class ValidationFileRepository {
  private validationFile = ValidationFileSchema;

  public async getValidationFiles(): Promise<ValidationFile[]> {
    return this.validationFile.find();
  }

  public async createValidationFiles(
    validationData: ValidationFile
  ): Promise<ValidationFile[]> {
    return this.validationFile.insertMany(validationData, {
      ordered: false,
    });
  }
}
