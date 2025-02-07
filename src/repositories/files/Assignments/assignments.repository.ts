import { UpdateResult, InsertManyResult } from "mongoose";
import AssignmentsSchema from "../../../schemas/Assignments.schema";
import { Assignments } from "../../../interfaces/assignments.interface";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";
import { UpdateStatusDto } from "../../../dtos/UpdateStatus.dto";

export class AssignmentsRepository {
  private assignments = AssignmentsSchema;

  public async getAssignments(): Promise<Assignments[]> {
    return this.assignments.find();
  }

  //Listar asignaciones por estado
  public async getAssignmentsByFiles(): Promise<Assignments[]> {
    return this.assignments.aggregate([
      {
        $match: {
          active: true,
        },
      },
      {
        $lookup: {
          from: "files",
          localField: "file_id",
          foreignField: "_id",
          as: "files",
        },
      },

      {
        $lookup: {
          from: "lawyers",
          localField: "lawyer_id",
          foreignField: "_id",
          as: "lawyers",
        },
      },

      {
        $lookup: {
          from: "evidencefiles",
          localField: "file_id",
          foreignField: "id_file",
          as: "evidences",
        },
      },

      {
        $unwind: "$evidences",
      },

      {
        $unwind: "$lawyers",
      },

      {
        $unwind: "$files",
      },
    ]);
  }

  public async createAssignments(
    assignmentsData: Assignments
  ): Promise<Assignments[]> {
    return this.assignments.insertMany(assignmentsData, {
      ordered: false,
    });
  }

  public async updateManyStatus(
    assignmentData: UpdateStatusDto
  ): Promise<UpdateResult> {
    const { _id, active, lawyer_id } = assignmentData;
    return this.assignments.updateMany(
      { _id: { $in: _id } },
      { $set: { active: active, lawyer_id: lawyer_id } }
    );
  }
}
