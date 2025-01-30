import { Router } from "express";
import { AssignmentsController } from "../controllers/files/Assignments/assignments.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { AssignmentsDto } from "../dtos/Assignments.dto";
import { UpdateStatusDto } from "../dtos/UpdateStatus.dto";

const router = Router();
const assignmentsController = new AssignmentsController();

router.get("/", assignmentsController.getAssignments);
router.get("/files", assignmentsController.getAssignmentsByFiles);
router.post(
  "/",
  validationMiddleware(AssignmentsDto, "body"),
  assignmentsController.createAssignments
);

router.put(
  "/",
  validationMiddleware(UpdateStatusDto, "body"),
  assignmentsController.updateManyStatus
);
export default router;
