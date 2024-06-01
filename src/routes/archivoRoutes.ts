import { Router } from "express";
import fileController from "../controllers/fileController";
import userFilesController from "../controllers/userFilesController";
const router = Router();

router.get("/day", fileController.documentsOutByDay);
router.get("/month", fileController.documentsOutByMonth);
router.get("/year", fileController.documentsOutByYear);

//Documents by users
router.get("/userDay", userFilesController.userDocumentsByDay);
router.get("/userMonth", userFilesController.userDocumentsByMonth);

export default router;
