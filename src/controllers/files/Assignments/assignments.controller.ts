import { Request, Response, NextFunction } from "express";
import { AssignmentsService } from "../../../services/files/Assignments/assignments.service";
import { AssignmentsDto } from "../../../dtos/Assignments.dto";
import { UpdateStatusDto } from "../../../dtos/UpdateStatus.dto";

export class AssignmentsController {
  private assignmentsService = new AssignmentsService();

  public getAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assignmentsData = await this.assignmentsService.getAssignments();
      res.status(200).json(assignmentsData);
    } catch (error) {
      next(error);
    }
  };

  public getAssignmentsByFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assignmentsData =
        await this.assignmentsService.getAssignmentsByFiles();

      res.status(200).json(assignmentsData);
    } catch (error) {
      next(error);
    }
  };

  public createAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assignmentsData: AssignmentsDto = req.body;

      await this.assignmentsService.createAssignments(assignmentsData);

      res.status(200).json({ message: "Created" });
    } catch (error) {
      next(error);
    }
  };

  public updateManyStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assignmentsData: UpdateStatusDto = req.body;
      await this.assignmentsService.updateManyStatus(assignmentsData);
      res.status(200).json({ message: "Updated succesfully" });
    } catch (error) {
      next(error);
    }
  };
}
