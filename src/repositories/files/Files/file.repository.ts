import { UpdateResult } from "mongoose";
import { mongo } from "mongoose";
import { FilesDto } from "../../../dtos/Files.dto";
import { UpdateFileDto } from "../../../dtos/UpdateFile.dto";
import { Files } from "../../../interfaces/files.interface";
import fileModel from "../../../schemas/Files.schema";
import { UpdateTicketDto } from "../../../dtos/UpdateTicket.dto";
import { UpdateStatusDeleveryDto } from "../../../dtos/UpdateStatusDelevery";

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

  public async getUploadFiles(
    state: string,
    stateII?: string
  ): Promise<Files[]> {
    return this.file.aggregate([
      {
        // Filter files with the given status
        $match: {
          $or: [{ status_file: state }, { status_file: stateII }],
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
          date_delivery: updatedData.date_delivery,
          pages: updatedData.pages,
          observation: updatedData.observation,
          inspection_id: updatedData.inspection_id,
          departure_date: updatedData.departure_date,
        },
      },
      {
        new: true,
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
          resolution_number: 1,
          resolution_date: 1,
          type_validation: 1,
          revocation: 1,
          assignments_id: "$assignments._id",
          evidence_id: 1,
          type_resolution_id: 1,
          file_id: 1,
        },
      },
    ]);
  }

  //Actualizar expediente por numero de comparendo
  public async updateFileByTicket(
    updateData: UpdateTicketDto[]
  ): Promise<mongo.BulkWriteResult> {
    const bulkUpdates = updateData.map((item) => ({
      updateOne: {
        filter: { ticket_number: item.ticket_number },
        update: {
          $set: {
            ticket_status: item.ticket_status,
            resolution_date: item.resolution_date,
            resolution_number: item.resolution_number,
            evidence_id: item.evidence_id,
            type_resolution_id: item.type_resolution_id,
            file_id: item.file_id,
          },
        },
      },
    }));

    const result = await this.file.bulkWrite(bulkUpdates);
    return result;
  }

  public async updateStatusDelevery(
    updateData: UpdateStatusDeleveryDto
  ): Promise<UpdateResult> {
    return this.file.updateMany(
      { _id: { $in: updateData._id } },
      {
        $set: {
          delivery_validation: updateData.delivery_validation,
          date_delivery: updateData.date_delivery,
        },
      }
    );
  }

  //Query all info from Files by ticket number

  public async getInfoByTicketNumber(ticket_number: string): Promise<Files[]> {
    return this.file.aggregate([
      {
        $match: {
          ticket_number: ticket_number,
        },
      },
      {
        $lookup: {
          from: "assignments",
          let: { id_file: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$file_id", "$$id_file"],
                },
              },
            },
            {
              $lookup: {
                from: "lawyers",
                localField: "lawyer_id",
                foreignField: "_id",
                as: "lawyer",
              },
            },
            {
              $unwind: "$lawyer",
            },
          ],
          as: "assignments",
        },
      },
      {
        $lookup: {
          from: "evidencefiles",
          localField: "_id",
          foreignField: "id_file",
          as: "evidences",
        },
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
        $project: {
          // Proyecta solo los campos que realmente necesitas
          _id: 1,
          ticket_number: 1,
          status_file: 1,
          date_delivery: 1,
          departure_date: 1,
          assignments: 1,
          evidences: 1,
          validations: 1,
        },
      },
    ]);
  }
}
