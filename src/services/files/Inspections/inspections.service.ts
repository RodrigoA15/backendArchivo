import { InspectionDto } from "../../../dtos/Inspections.dto";
import { HttpException } from "../../../exceptions/HttpException";
import { Inspection } from "../../../interfaces/inspection.interface";
import { InspectionRepository } from "../../../repositories/files/Inspections/inspection.repository";
import { isEmpty } from "../../../utils/util";

export class InspectionService {
  private inspectionService = new InspectionRepository();

  public async getInspections(): Promise<Inspection[]> {
    const inspections: Inspection[] =
      await this.inspectionService.getInspections();
    if (isEmpty(inspections))
      throw new HttpException(404, "Inspections not found");

    return inspections;
  }

  public async createInspections(
    inspectionData: InspectionDto
  ): Promise<Inspection> {
    if (isEmpty(inspectionData)) throw new HttpException(400, "Bad request");

    return this.inspectionService.createInspection(inspectionData);
  }
}
