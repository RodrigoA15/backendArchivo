import { ResolutionsDto } from "../../../dtos/Resolutions.dto";
import { HttpException } from "../../../exceptions/HttpException";
import { Resolutions } from "../../../interfaces/resolutions.interface";
import { ResolutionsRepository } from "../../../repositories/files/Resolutions/resolutions.repository";
import { isEmpty } from "../../../utils/util";

export class ResolutionsService {
  private resolutionRepository = new ResolutionsRepository();

  public async createResolution(
    resolutionData: ResolutionsDto
  ): Promise<Resolutions> {
    if (isEmpty(resolutionData)) throw new HttpException(400, "Bad request");

    return await this.resolutionRepository.createResolution(resolutionData);
  }
}
