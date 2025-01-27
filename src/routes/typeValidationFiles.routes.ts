import { Router } from "express";
import { TypeValidationController } from "../controllers/files/TypeValidationFiles/TypeValidation.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { TypeValidationFileDto } from "../dtos/TypeValidationFile.dto";

const router = Router();
const typeValidation = new TypeValidationController();

router.get("/", typeValidation.getTypeValidations);
router.post(
  "/",
  validationMiddleware(TypeValidationFileDto, "body"),
  typeValidation.createTypeValidations
);

export default router;
