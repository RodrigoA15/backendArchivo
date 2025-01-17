import { NextFunction, Request, Response } from "express";
import { CounterService } from "../../../services/files/Counters/counter.service";
import { CounterDto } from "../../../dtos/Counters.dto";

export class CounterController {
  private counterService = new CounterService();

  public createSequence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const counterData: CounterDto = req.body;
      const newCounter = await this.counterService.createSequence(counterData);

      res.status(200).json(newCounter);
    } catch (error) {
      next(error);
    }
  };
}
