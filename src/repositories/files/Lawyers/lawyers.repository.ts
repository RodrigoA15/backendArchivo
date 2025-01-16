import { Lawyers } from "../../../interfaces/lawyers.interface";
import lawyerModel from "../../../schemas/Lawyers.schema";
import { CreateLawyerDto } from "../../../dtos/Lawyers.dto";

class LawyerRepository {
  public lawyers = lawyerModel;

  public async getLawyers(): Promise<Lawyers[]> {
    const lawyers: Lawyers[] = await this.lawyers
      .find()
      .populate("inspection_id", "name_inspection -_id");
    return lawyers;
  }
  public async createLawyer(lawyerData: CreateLawyerDto): Promise<Lawyers> {
    return new this.lawyers(lawyerData).save();
  }
}

export default LawyerRepository;
