import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import FileStatusTypeController from "../controllers/files/FileStatus/fileStatus.controller";
import { FileStatusDto } from "../dtos/FileStatus.dto";

const router = Router();
const fileStatusController = new FileStatusTypeController();

router.get("/", fileStatusController.getFileStatus);
router.get("/search/:name", fileStatusController.getStatusByName);
router.post(
  "/",
  validationMiddleware(FileStatusDto),
  fileStatusController.createFileStatus
);

export default router;
