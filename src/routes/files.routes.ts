import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { FilesController } from "../controllers/files/Files/files.controller";
import { FilesDto } from "../dtos/Files.dto";
import { UpdateFileDto } from "../dtos/UpdateFile.dto";

const router = Router();
const fileController = new FilesController();

router.get("/", fileController.getFiles);
router.get("/state/:name", fileController.getFilesByState);
router.get("/status-file/:state", fileController.getUploadFiles);

router.post(
  "/",
  validationMiddleware(FilesDto, "body"),
  fileController.createFiles
);
router.put(
  "/",
  validationMiddleware(UpdateFileDto, "body"),
  fileController.assignedLawyer
);

export default router;
