import { UpdateResult } from "mongoose";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";
import { Files } from "../../../interfaces/files.interface";
import fileModel from "../../../schemas/Files.schema";

export class FileRepository {
  private file = fileModel;

  public async getFiles(): Promise<Files[]> {
    return this.file.find();
  }

  public async createFiles(filesData: FilesDto): Promise<Files> {
    return new this.file(filesData).save();
  }

  public async getFilesByState(state: string): Promise<Files[]> {
    return this.file.find({ status_file: state });
  }

  public async getUploadFiles(state: string): Promise<Files[]> {
    return this.file.aggregate([
      {
        // Filter files with the given status
        $match: {
          status_file: state,
        },
      },

      {
        // Join with evidence files
        $lookup: {
          from: "evidencefiles",
          localField: "_id",
          foreignField: "id_file",
          as: "evidence",
        },
      },

      {
        // Join with assignments
        $lookup: {
          from: "assignments",
          let: { id_file: "$_id", status: true },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$file_id", "$$id_file"] },
                    { $eq: ["$active", "$$status"] },
                  ],
                },
              },
            },
          ],
          as: "assignments",
        },
      },

      {
        // Join with lawyers
        $lookup: {
          from: "lawyers",
          localField: "assignments.lawyer_id",
          foreignField: "_id",
          as: "lawyers",
        },
      },

      {
        // Unwind the arrays of objects
        $unwind: "$lawyers",
      },

      {
        $unwind: "$assignments",
      },
    ]);
  }

  public async assignedLawyer(
    updatedData: UpdateFileDto
  ): Promise<UpdateResult> {
    return this.file.updateMany(
      { _id: { $in: updatedData._id } },
      {
        $set: {
          id_lawyer: updatedData.id_lawyer,
          status_file: updatedData.status_file,
          delevery_date: updatedData.delevery_date,
          pages: updatedData.pages,
          observation: updatedData.observation,
          inspection_id: updatedData.inspection_id,
          departure_date: updatedData.departure_date,
        },
      }
    );
  }

  public async getFilesProcessed(): Promise<Files[]> {
    return this.file.aggregate([
      {
        $match: {
          status_file: "Pendiente proceso",
        },
      },

      {
        $lookup: {
          from: "assignments",
          let: { id_file: "$_id", status: true },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$file_id", "$$id_file"] },
                    { $eq: ["$active", "$$status"] },
                  ],
                },
              },
            },
            {
              $project: { _id: 1 },
            },
          ],
          as: "assignments",
        },
      },

      {
        $unwind: "$assignments",
      },

      {
        $lookup: {
          from: "validationfiles",
          localField: "assignments._id",
          foreignField: "assigned_id",
          as: "validations",
        },
      },

      {
        $unwind: "$validations",
      },

      {
        $lookup: {
          from: "type_validation_files",
          localField: "validations.type_validation_id",
          foreignField: "_id",
          as: "type_validation",
        },
      },

      {
        $project: {
          ticket_number: 1,
          ticket_date: 1,
          violation: 1,
          ticket_status: 1,
          offender_identification: 1,
          offender_name: 1,
          offender_last_name: 1,
          status_file: 1,
          validation: "$validations.status",
          type_validation: 1,
        },
      },
    ]);
  }
}
