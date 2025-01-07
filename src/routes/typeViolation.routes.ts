import { Router } from "express";
import TypeViolationController from "../controllers/files/TypeViolation/typeViolation.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { ViolationType } from "../dtos/ViolationType.dto";

const router = Router();
const violationTypeController = new TypeViolationController();

router.get("/", violationTypeController.getViolationTypes);
router.post(
  "/",
  validationMiddleware(ViolationType, 'body'),
  violationTypeController.createViolationType
);

export default router;
    