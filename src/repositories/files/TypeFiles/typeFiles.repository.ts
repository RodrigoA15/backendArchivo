import { TypeFilesDto } from "../../../dtos/TypeFiles.dto";
import { TypeFiles } from "../../../interfaces/typeFiles.interface";
import Type_filesSchema from "../../../schemas/Type_files.schema";

export class TypeFilesRepository {
  private typeFileSchema = Type_filesSchema;

  public async getTypeFiles(): Promise<TypeFiles[]> {
    return await this.typeFileSchema.find();
  }
  public async createTypeFile(typeFileData: TypeFilesDto): Promise<TypeFiles> {
    return new this.typeFileSchema(typeFileData).save();
  }
}
