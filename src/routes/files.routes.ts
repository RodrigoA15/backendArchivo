import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { FilesController } from "../controllers/files/Files/files.controller";
import { FilesDto } from "../dtos/Files.dto";
import { UpdateTicketDto } from "../dtos/UpdateTicket.dto";

const router = Router();
const fileController = new FilesController();

router.get("/", fileController.getFiles);
router.get("/state/:name", fileController.getFilesByState);
router.get("/status-file/:state", fileController.getUploadFiles);
router.get("/processed", fileController.getFilesProcessed);
router.post(
  "/",
  validationMiddleware(FilesDto, "body"),
  fileController.createFiles
);

router.put(
  "/",
  // validationMiddleware(UpdateFileDto, "body"),
  fileController.assignedLawyer
);

router.put(
  "/updated-ticket",
  // validationMiddleware(UpdateTicketDto, "body"),
  fileController.updateFileByTicket
);

export default router;
