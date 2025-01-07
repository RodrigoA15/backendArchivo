import typeViolationModel from "../../../schemas/TypeViolation.schema";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";
import { ViolationType } from "../../../dtos/ViolationType.dto";

class TypeViolationRepository {
  public typeViolation = typeViolationModel;

  public async getViolationTypes(): Promise<TypeViolation[]> {
    const violationTypes: TypeViolation[] = await this.typeViolation.find();
    return violationTypes;
  }

  public async createViolationType(data: ViolationType) : Promise<TypeViolation> {
    return new this.typeViolation(data).save();
  }
}

export default TypeViolationRepository;
