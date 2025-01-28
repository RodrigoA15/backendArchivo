import { Router } from "express";
import { AssignmentsController } from "../controllers/files/Assignments/assignments.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { AssignmentsDto } from "../dtos/Assignments.dto";

const router = Router();
const assignmentsController = new AssignmentsController();

router.get("/", assignmentsController.getAssignments);
router.post(
  "/",
  validationMiddleware(AssignmentsDto, "body"),
  assignmentsController.createAssignments
);

export default router;
