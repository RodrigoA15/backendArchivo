import { InspectionDto } from "../../../dtos/Inspections.dto";
import { Inspection } from "../../../interfaces/inspection.interface";
import InspectionSchema from "../../../schemas/Inspection.schema";

export class InspectionRepository {
  private inspection = InspectionSchema;

  public async getInspections(): Promise<Inspection[]> {
    return this.inspection.find();
  }

  public async createInspection(
    inspectionData: InspectionDto
  ): Promise<Inspection> {
    return new this.inspection(inspectionData).save();
  }
}
