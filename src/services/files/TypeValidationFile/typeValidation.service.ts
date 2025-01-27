import { TypeValidationRepository } from "../../../repositories/files/TypeValidationFile/typeValidation.repository";
import { TypeValidationFile } from "../../../interfaces/typevalidationFile.interface";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";
import { TypeValidationFileDto } from "../../../dtos/TypeValidationFile.dto";

export class TypeValidationService {
  private typeValidationrepository = new TypeValidationRepository();
  public async getTypeValidations(): Promise<TypeValidationFile[]> {
    const types = await this.typeValidationrepository.getTypeValidations();

    if (isEmpty(types)) throw new HttpException(404, "Files not found");

    return types;
  }

  public async createTypeValidations(
    dataType: TypeValidationFileDto
  ): Promise<TypeValidationFile> {
    if (isEmpty(dataType)) throw new HttpException(400, "Bad request");

    return this.typeValidationrepository.createTypeValidations(dataType);
  }
}
