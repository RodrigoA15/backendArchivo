import { UpdateResult } from "mongoose";
import AssignmentsSchema from "../../../schemas/Assignments.schema";
import { Assignments } from "../../../interfaces/assignments.interface";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";
import { UpdateStatusDto } from "../../../dtos/UpdateStatus.dto";

export class AssignmentsRepository {
  private assignments = AssignmentsSchema;

  public async getAssignments(): Promise<Assignments[]> {
    return this.assignments.find();
  }

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
    assignmentsData: AssignmentsDto
  ): Promise<Assignments> {
    return new this.assignments(assignmentsData).save();
  }

  public async updateManyStatus(
    assignmentData: UpdateStatusDto
  ): Promise<UpdateResult> {
    return this.assignments.updateMany(
      { _id: { $in: assignmentData._id } },
      { $set: { active: false } }
    );
  }
}
