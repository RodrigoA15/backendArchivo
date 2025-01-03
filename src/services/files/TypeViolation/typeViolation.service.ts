import TypeViolationRepository from "../../../repositories/files/TypeViolation/typeViolation.repository";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";

class TypeViolationService {
  public typeViolationRepository = new TypeViolationRepository();

  public async getViolationTypes(): Promise<TypeViolation[]> {
    const violationTypes: TypeViolation[] =
      await this.typeViolationRepository.getViolationTypes();

    if (violationTypes.length > 0) {
      return violationTypes;
    }

    throw new Error("Not found Violation Types");
  }
}

export default TypeViolationService;