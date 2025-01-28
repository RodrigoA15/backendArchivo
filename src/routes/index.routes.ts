import { Router } from "express";
import fileRoutes from "./archivo.routes";
import audienceRoutes from "./audiences.routes";
import lawyersRoutes from "./lawyers.routes";
import filesRoutes from "./files.routes";
import inspectionRoutes from "./inspections.routes";
import counterRoutes from "./counter.routes";
import evidenceRoutes from "./evidenceFile.routes";
import typeValidationRoutes from "./typeValidationFiles.routes";
import validationFilesRoutes from "./validationFile.routes";
import assignmentsRoutes from "./assignments.routes";
const router = Router();
const pathRoutes = "/api/v1";

router.use(`${pathRoutes}/file`, fileRoutes);
router.use(`${pathRoutes}/audience`, audienceRoutes);
router.use(`${pathRoutes}/lawyers`, lawyersRoutes);
router.use(`${pathRoutes}/files`, filesRoutes);
router.use(`${pathRoutes}/inspections`, inspectionRoutes);
router.use(`${pathRoutes}/counter`, counterRoutes);
router.use(`${pathRoutes}/evidences`, evidenceRoutes);
router.use(`${pathRoutes}/type-validation`, typeValidationRoutes); //Type validation files
router.use(`${pathRoutes}/validation-file`, validationFilesRoutes);
router.use(`${pathRoutes}/assignments`, assignmentsRoutes);

export default router;
