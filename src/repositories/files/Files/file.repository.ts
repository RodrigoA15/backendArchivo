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
    return this.file
      .find({ status_file: state })
      .populate("id_lawyer", "name last_name");
  }

  public async getUploadFiles(state: string): Promise<Files[]> {
    return this.file.aggregate([
      {
        $match: {
          status_file: state,
        },
      },

      {
        $lookup: {
          from: "lawyers",
          localField: "id_lawyer",
          foreignField: "_id",
          as: "lawyers",
        },
      },

      {
        $unwind: "$lawyers",
      },

      {
        $lookup: {
          from: "evidencefiles",
          localField: "_id",
          foreignField: "id_file",
          as: "evidence",
        },
      },

      {
        $unwind: "$evidence",
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
        },
      }
    );
  }
}
