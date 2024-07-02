import { Router } from "express";
import fileController from "../controllers/fileController";
import userFilesController from "../controllers/expedientes/userFilesController";
import chartsFilesController from "../controllers/chartsFilesController";
import licensePlatesController from "../controllers/License_plates";
const router = Router();

router.get("/day", fileController.documentsOutByDay);
router.get("/month", fileController.documentsOutByMonth);
router.get("/year", fileController.documentsOutByYear);

//Documents by users
router.get("/userDay", userFilesController.userDocumentsByDay);
router.get("/userMonth", userFilesController.userDocumentsByMonth);
router.get("/userTotal", userFilesController.userTotalDocuments);
router.get("/expTotal", userFilesController.expedientesTotal);
router.get("/expDay", userFilesController.expedientesByDay);
router.get("/expMonth", userFilesController.expedientesByMonth);
router.get("/expYear", userFilesController.expedientesByYear);

//Charts by documents Out
router.get("/chartDays", chartsFilesController.chartByDay);
router.get("/chartMonth", chartsFilesController.chartByMonth);

//License plates
router.get("/license", licensePlatesController.licensePlatesByDay);
export default router;
