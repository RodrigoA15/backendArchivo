import { Router } from "express";
import { InspectionController } from "../controllers/files/Inspections/inspections.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { InspectionDto } from "../dtos/Inspections.dto";

const router = Router();
const inspectionController = new InspectionController();

router.get("/", inspectionController.getInspections);
router.post(
  "/",
  validationMiddleware(InspectionDto, "body"),
  inspectionController.createInspections
);

export default router;
