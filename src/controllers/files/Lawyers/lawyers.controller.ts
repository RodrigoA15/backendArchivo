import { Request, Response, NextFunction } from "express";
import { Lawyers } from "../../../interfaces/lawyers.interface";
import lawyerService from "../../../services/files/Lawyers/lawyers.service";
import { CreateLawyerDto } from "../../../dtos/Lawyers.dto";

class LawyersController {
  public lawyerService = new lawyerService();

  public getLawyers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const getLawyersData: Lawyers[] = await this.lawyerService.getLawyers();
      res.status(200).json(getLawyersData);
    } catch (error) {
      next(error);
    }
  };

  public createLawyer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const lawyerData: CreateLawyerDto = req.body;
      const newLawyer: Lawyers = await this.lawyerService.createLawyer(
        lawyerData
      );
      res.status(201).json({ data: newLawyer, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default LawyersController;
