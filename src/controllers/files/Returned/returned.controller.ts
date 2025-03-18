import { NextFunction, Request, Response } from "express";
import { ReturnedService } from "../../../services/files/Returned/returned.service";
import { ReturnedDto } from "../../../dtos/Returned.dto";

export class ReturnedController {
  private returnedService = new ReturnedService();

  public createReturnedFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dataReturned: ReturnedDto = req.body;
      await this.returnedService.createReturnedFile(dataReturned);
      res.status(200).json("Creado correctamente");
    } catch (error) {
      next(error);
    }
  };

  public getReturnedFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const returnedData = await this.returnedService.getReturnedFile();
      res.status(200).json(returnedData);
    } catch (error) {
      next(error);
    }
  };
}
