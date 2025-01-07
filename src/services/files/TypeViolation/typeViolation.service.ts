import TypeViolationRepository from "../../../repositories/files/TypeViolation/typeViolation.repository";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";
import { ViolationType } from "../../../dtos/ViolationType.dto";
import { isEmpty } from "../../../utils/util";
import { HttpException } from "../../../exceptions/HttpException";

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

  public createViolationType(
    dataViolation: ViolationType
  ): Promise<TypeViolation> {
    if (isEmpty(dataViolation)) throw new HttpException(400, "Bad Request");
    return this.typeViolationRepository.createViolationType(dataViolation);
  }
}

export default TypeViolationService;
