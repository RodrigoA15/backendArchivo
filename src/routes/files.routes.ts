import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { FilesController } from "../controllers/files/Files/files.controller";
import { FilesDto } from "../dtos/Files.dto";

const router = Router();
const fileController = new FilesController();

router.get("/", fileController.getFiles);
router.get("/state/:name", fileController.getFilesByState)
router.post(
  "/",
  validationMiddleware(FilesDto, "body"),
  fileController.createFiles
);

export default router;
