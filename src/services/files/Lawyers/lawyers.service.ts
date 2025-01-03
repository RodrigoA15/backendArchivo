import { CreateLawyerDto } from "../../../dtos/Lawyers.dto";
import { HttpException } from "../../../exceptions/HttpException";
import { Lawyers } from "../../../interfaces/lawyers.interface";
import lawyerRepository from "../../../repositories/files/Lawyers/lawyers.repository";
import { isEmpty } from "../../../utils/util";

class LawyersService {
  public lawyerRepository = new lawyerRepository();

  public async getLawyers(): Promise<Lawyers[]> {
    const lawyers: Lawyers[] = await this.lawyerRepository.getLawyers();
    if (lawyers.length > 0) {
      return lawyers;
    }
    throw new Error("Not found lawyers");
  }
  public async createLawyer(lawyerData: CreateLawyerDto): Promise<Lawyers> {
    if (isEmpty(lawyerData)) throw new HttpException(400, "Bad request");
    return await this.lawyerRepository.createLawyer(lawyerData);
  }
}

export default LawyersService;
