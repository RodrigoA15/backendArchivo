import AssignmentsSchema from "../../../schemas/Assignments.schema";
import { Assignments } from "../../../interfaces/assignments.interface";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";

export class AssignmentsRepository {
  private assignments = AssignmentsSchema;

  public async getAssignments(): Promise<Assignments[]> {
    return this.assignments.find();
  }

  public async createAssignments(
    assignmentsData: AssignmentsDto
  ): Promise<Assignments> {
    return new this.assignments(assignmentsData).save();
  }
}
