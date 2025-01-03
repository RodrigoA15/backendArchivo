import typeViolationModel from "../../../schemas/TypeViolation.schema";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";

class TypeViolationRepository {
  public typeViolation = typeViolationModel;

  public async getViolationTypes(): Promise<TypeViolation[]> {
    const violationTypes: TypeViolation[] = await this.typeViolation.find();
    return violationTypes;
  }
}

export default TypeViolationRepository;
