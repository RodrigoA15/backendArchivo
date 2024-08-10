import { Request, Response } from "express";
import * as foldersOutService from "../services/foldersOutService";
class ChartFilesController {
  constructor() {}

  async getAllFoldersOutByDay(req: Request, res: Response) {
    try {
      const total = await foldersOutService.getTotalFoldersOutByDay();
      res.status(200).json(total);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  async getAllFoldersOutByMonth(req: Request, res: Response) {
    try {
      const total = await foldersOutService.getAllFoldersOutByMonth();
      res.status(200).json(total);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}

export default new ChartFilesController();
