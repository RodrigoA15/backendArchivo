import { Router } from "express";
import { AssignmentsController } from "../controllers/files/Assignments/assignments.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { UpdateStatusDto } from "../dtos/UpdateStatus.dto";

const router = Router();
const assignmentsController = new AssignmentsController();

router.get("/", assignmentsController.getAssignments);
router.get("/files", assignmentsController.getAssignmentsByFiles);
router.post("/", assignmentsController.createAssignments);

router.put(
  "/",
  validationMiddleware(UpdateStatusDto, "body"),
  assignmentsController.updateManyStatus
);
export default router;
