import { TypeFilesDto } from "../../../dtos/TypeFiles.dto";
import { HttpException } from "../../../exceptions/HttpException";
import { TypeFiles } from "../../../interfaces/typeFiles.interface";
import { TypeFilesRepository } from "../../../repositories/files/TypeFiles/typeFiles.repository";
import { isEmpty } from "../../../utils/util";

export class TypeFilesService {
  private typeFilesRepository = new TypeFilesRepository();

  public async getTypeFiles(): Promise<TypeFiles[]> {
    const typeFiles = await this.typeFilesRepository.getTypeFiles();

    if (isEmpty(typeFiles)) throw new HttpException(404, "Files not found");
    return typeFiles;
  }

  public async createTypeFile(typeFileData: TypeFilesDto): Promise<TypeFiles> {
    if (isEmpty(typeFileData)) throw new HttpException(400, "Bad request");

    return this.typeFilesRepository.createTypeFile(typeFileData);
  }
}
