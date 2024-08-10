import { Request, Response } from "express";
import * as licensePlatesService from "../services/licensePlatesService";

class License_plates_Controller {
  constructor() {}

  async totalAllLicensesByDay(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.totalAllLicensesByDay();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesReturn(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesReturn();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async totalLicensesOutArchive(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.totalLicensesOutArchive();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesByDays(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesByDays();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesByMonth(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesByMonth();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesReturnMonths(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesReturnMonths();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesLastYear(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesLastYear();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicensesByUserQX(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicensesByUserQX();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getVehicleClassReturned(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getVehicleClassReturned();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLicencesPlatesInfo(req: Request, res: Response) {
    try {
      const total = await licensePlatesService.getAllLicencesPlatesInfo();
      res.status(200).json(total);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new License_plates_Controller();
