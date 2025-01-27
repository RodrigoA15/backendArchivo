import TypeValidationSchema from "../../../schemas/TypeValidationFile";
import { TypeValidationFile } from "../../../interfaces/typevalidationFile.interface";
import { TypeValidationFileDto } from "../../../dtos/TypeValidationFile.dto";

export class TypeValidationRepository {
  private typeValidationSchema = TypeValidationSchema;

  public async getTypeValidations(): Promise<TypeValidationFile[]> {
    return await this.typeValidationSchema.find();
  }

  public async createTypeValidations(
    dataType: TypeValidationFileDto
  ): Promise<TypeValidationFile> {
    return new this.typeValidationSchema(dataType).save();
  }
}
