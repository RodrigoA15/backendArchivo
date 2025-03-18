import { ReturnedDto } from "../../../dtos/Returned.dto";
import { ReturnedInterface } from "../../../interfaces/returned.interface";
import ReturnedSchema from "../../../schemas/Returned.schema";

export class ReturnedRepository {
  private returnedSchema = ReturnedSchema;

  public async createReturnedFile(
    dataReturned: ReturnedDto
  ): Promise<ReturnedInterface[]> {
    return this.returnedSchema.insertMany(dataReturned);
  }

  public async getReturnedFile(): Promise<ReturnedInterface[]> {
    return this.returnedSchema.aggregate([
      {
        $lookup: {
          from: "files",
          localField: "id_file",
          foreignField: "_id",
          as: "files",
        },
      },

      {
        $unwind: "$files",
      },

      {
        $lookup: {
          from: "lawyers",
          localField: "id_lawyer",
          foreignField: "_id",
          as: "lawyer",
        },
      },

      {
        $project: {
          "files.ticket_number": 1,
          lawyer: 1,
          user_returned: 1,
          date_returned: 1,
          observation: 1,
        },
      },
    ]);
  }
}
