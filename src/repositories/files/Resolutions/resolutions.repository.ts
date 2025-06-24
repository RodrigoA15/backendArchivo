import { ResolutionsDto } from "../../../dtos/Resolutions.dto";
import { Resolutions } from "../../../interfaces/resolutions.interface";
import ResolutionsSchema from "../../../schemas/resolutions.schema";

export class ResolutionsRepository {
  private resolutionsSchema = ResolutionsSchema;

  public async createResolution(
    resolutionData: ResolutionsDto
  ): Promise<Resolutions> {
    return new this.resolutionsSchema(resolutionData).save();
  }
}
