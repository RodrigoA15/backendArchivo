import { ReturnedDto } from "../../../dtos/Returned.dto";
import { HttpException } from "../../../exceptions/HttpException";
import { ReturnedInterface } from "../../../interfaces/returned.interface";
import { ReturnedRepository } from "../../../repositories/files/Returned/returned.repository";
import { isEmpty } from "../../../utils/util";

export class ReturnedService {
  returnedRepository = new ReturnedRepository();

  public async createReturnedFile(
    dataReturned: ReturnedDto
  ): Promise<ReturnedInterface[]> {
    if (isEmpty(dataReturned)) throw new HttpException(400, "Bad request");
    return this.returnedRepository.createReturnedFile(dataReturned);
  }

  public async getReturnedFile(): Promise<ReturnedInterface[]> {
    const returnedData = await this.returnedRepository.getReturnedFile();
    if (isEmpty(returnedData))
      throw new HttpException(404, "Returned not found");
    return returnedData;
  }
}
