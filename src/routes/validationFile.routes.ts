import { Router } from "express";
import { ValidationFileController } from "../controllers/files/ValidationFile/validationFile.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { ValidationFileDto } from "../dtos/ValidationFile.dto";

const router = Router();
const validationFileController = new ValidationFileController();

router.get("/", validationFileController.getValidationFiles);
router.post("/", validationFileController.createValidationFiles);
export default router;
