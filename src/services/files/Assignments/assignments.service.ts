import { UpdateResult, InsertManyResult } from "mongoose";
import { AssignmentsRepository } from "../../../repositories/files/Assignments/assignments.repository";
import { Assignments } from "../../../interfaces/assignments.interface";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";
import { UpdateStatusDto } from "../../../dtos/UpdateStatus.dto";

export class AssignmentsService {
  private assignmentsRepository = new AssignmentsRepository();

  public async getAssignments(): Promise<Assignments[]> {
    const assignmentsData = await this.assignmentsRepository.getAssignments();

    if (isEmpty(assignmentsData))
      throw new HttpException(404, "Assignments not found");

    return assignmentsData;
  }

  public async getAssignmentsByFiles(): Promise<Assignments[]> {
    const assignmentsData =
      await this.assignmentsRepository.getAssignmentsByFiles();

    if (isEmpty(assignmentsData))
      throw new HttpException(404, "Assignments not found");

    return assignmentsData;
  }

  public async createAssignments(
    assignmentsData: Assignments
  ): Promise<any> {
    if (isEmpty(assignmentsData)) throw new HttpException(400, "Bad request");

    return this.assignmentsRepository.createAssignments(assignmentsData);
  }

  public async updateManyStatus(
    assignmentsData: UpdateStatusDto
  ): Promise<UpdateResult> {
    if (isEmpty(assignmentsData)) throw new HttpException(400, "Bad request");

    return this.assignmentsRepository.updateManyStatus(assignmentsData);
  }
}
