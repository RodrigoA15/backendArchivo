import { Router } from "express";
import TypeViolationController from "../controllers/files/TypeViolation/typeViolation.controller";

const router = Router();
const violationTypeController = new TypeViolationController();

router.get("/", violationTypeController.getViolationTypes);

export default router;
