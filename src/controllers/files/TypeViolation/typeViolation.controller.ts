import { Request, Response, NextFunction } from "express";
import typeViolationService from "../../../services/files/TypeViolation/typeViolation.service";
import { TypeViolation } from "../../../interfaces/typeViolation.interface";
import { ViolationType } from "../../../dtos/ViolationType.dto";

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

  public createViolationType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataViolation: ViolationType = req.body;
      const newViolation = await this.typeViolationService.createViolationType(
        dataViolation
      );
      res.status(200).json(newViolation);
    } catch (error) {
      next(error);
    }
  };
}

export default TypeViolationController;
