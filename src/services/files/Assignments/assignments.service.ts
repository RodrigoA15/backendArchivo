import { AssignmentsRepository } from "../../../repositories/files/Assignments/assignments.repository";
import { Assignments } from "../../../interfaces/assignments.interface";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";

export class AssignmentsService {
  private assignmentsRepository = new AssignmentsRepository();

  public async getAssignments(): Promise<Assignments[]> {
    const assignmentsData = await this.assignmentsRepository.getAssignments();

    if (isEmpty(assignmentsData))
      throw new HttpException(404, "Assignments not found");

    return assignmentsData;
  }

  public async createAssignments(
    assignmentsData: AssignmentsDto
  ): Promise<Assignments> {
    if (isEmpty(assignmentsData)) throw new HttpException(400, "Bad request");

    return this.assignmentsRepository.createAssignments(assignmentsData);
  }
}
