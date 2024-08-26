import { Router } from "express";
import fileController from "../controllers/totalFoldersOutController";
import userFilesController from "../controllers/expedientes/userFilesController";
import chartsFilesController from "../controllers/foldersOutController";
import licensePlatesController from "../controllers/licensePlatesController";
import userFoldersOutController from "../controllers/userFoldersOutController";
const router = Router();

router.get("/day", fileController.getTotalFoldersOutByDay);
router.get("/month", fileController.getTotalFoldersOutByMonth);
router.get("/year", fileController.getTotalFoldersOutByYear);

//Documents by users
router.get("/userDay", userFoldersOutController.getAllFoldersUserDay);
router.get("/userMonth", userFoldersOutController.getTotalFoldersUserMonth);
router.get("/userTotal", userFilesController.userTotalDocuments);
router.get("/expTotal", userFilesController.expedientesTotal);
router.get("/expDay", userFilesController.expedientesByDay);
router.get("/expMonth", userFilesController.expedientesByMonth);
router.get("/expYear", userFilesController.expedientesByYear);

//Charts by folders Out
router.get("/chartDays", chartsFilesController.getAllFoldersOutByDay);
router.get("/chartMonth", chartsFilesController.getAllFoldersOutByMonth);

//License plates
router.get("/license-day", licensePlatesController.totalAllLicensesByDay);
router.get("/license-month", licensePlatesController.totalAllLicensesByMonth);

//Licenses returned
router.get("/licensesReturn", licensePlatesController.getAllLicensesReturn);
router.get("/licensesOut", licensePlatesController.totalLicensesOutArchive);
router.get("/licensesByDays", licensePlatesController.getAllLicensesByDays);
router.get("/licensesByMonth", licensePlatesController.getAllLicensesByMonth);
router.get(
  "/licenses-returned-month",
  licensePlatesController.getAllLicensesReturnMonths
);
router.get(
  "/licenses-last-year",
  licensePlatesController.getAllLicensesLastYear
);

router.get("/licenses-user", licensePlatesController.getAllLicensesByUserQX);
router.get(
  "/class-vehicle-returned",
  licensePlatesController.getVehicleClassReturned
);
router.get("/licenses-info", licensePlatesController.getAllLicencesPlatesInfo);

export default router;
