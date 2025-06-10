import { Router } from "express";
import { TypeFilesController } from "../controllers/files/TypeFiles/typeFiles.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { TypeFilesDto } from "../dtos/TypeFiles.dto";

const router = Router();
const typeFilesController = new TypeFilesController();

router.get("/", typeFilesController.getTypeFiles);

router.post(
  "/",
  validationMiddleware(TypeFilesDto, "body"),
  typeFilesController.createTypeFile
);

export default router;
