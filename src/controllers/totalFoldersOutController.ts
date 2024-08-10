import { Request, Response } from "express";
import * as totalFoldersOutService from "../services/totalFoldersOutService";

class archivoController {
  constructor() {}

  async getTotalFoldersOutByDay(req: Request, res: Response) {
    try {
      const total = await totalFoldersOutService.getTotalFoldersOutByDay();
      res.status(200).json(total);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  async getTotalFoldersOutByMonth(req: Request, res: Response) {
    try {
      const total = await totalFoldersOutService.getTotalFoldersOutByMonth();
      res.status(200).json(total);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  async getTotalFoldersOutByYear(req: Request, res: Response) {
    try {
      const total = await totalFoldersOutService.getTotalFoldersOutByYear();
      res.status(200).json(total);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}

export default new archivoController();
