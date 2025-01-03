import { Request, Response, NextFunction } from "express";
import typeViolationService from "../../../services/files/TypeViolation/typeViolation.service";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";

class TypeViolationController {
  public typeViolationService = new typeViolationService();

  public getViolationTypes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const getViolationTypes: TypeViolation[] =
        await this.typeViolationService.getViolationTypes();

      res.status(200).json(getViolationTypes);
    } catch (error) {
      next(error);
    }
  };
}

export default TypeViolationController;
