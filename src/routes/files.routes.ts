import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { FilesController } from "../controllers/files/Files/files.controller";
import { FilesDto } from "../dtos/Files.dto";
import { UpdateStatusDeleveryDto } from "../dtos/UpdateStatusDelevery";

const router = Router();
const fileController = new FilesController();

router.get("/", fileController.getFiles);
router.get("/state/:name/:userID", fileController.getFilesByState);
router.get("/status-file/:state/:stateII?", fileController.getUploadFiles);
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

//Update Delevery status field
router.put(
  "/update-delevery",
  validationMiddleware(UpdateStatusDeleveryDto, "body"),
  fileController.updateStatusDelevery
);

//Query all info from files
router.get("/all-info/:ticket_number", fileController.getInfoByTicketNumber);
export default router;
