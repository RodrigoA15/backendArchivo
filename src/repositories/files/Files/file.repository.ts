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
          localField: "_id",
          foreignField: "file_id",
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
        },
      }
    );
  }
}
