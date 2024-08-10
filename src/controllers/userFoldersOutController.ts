import { Request, Response } from "express";
import * as userDocumentsOutService from "../services/userFoldersOutService";
class userDocumentsOutController {
  constructor() {}

  async getAllFoldersUserDay(req: Request, res: Response) {
    try {
      const total = await userDocumentsOutService.getAllFoldersUserDay();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getTotalFoldersUserMonth(req: Request, res: Response) {
    try {
      const total = await userDocumentsOutService.getAllFoldersUserMonth();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userDocumentsOutController();
