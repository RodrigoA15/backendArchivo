import { Router } from "express";
import fileRoutes from "./archivo.routes";
import audienceRoutes from "./audiences.routes";
import lawyersRoutes from "./lawyers.routes";
import fileStatusRoutes from "./fileStatus.routes";
import violationTypeRoutes from "./typeViolation.routes";
import filesRoutes from "./files.routes";
import inspectionRoutes from "./inspections.routes";

const router = Router();
const pathRoutes = "/api/v1";

router.use(`${pathRoutes}/file`, fileRoutes);
router.use(`${pathRoutes}/audience`, audienceRoutes);
router.use(`${pathRoutes}/lawyers`, lawyersRoutes);
router.use(`${pathRoutes}/file-status`, fileStatusRoutes);
router.use(`${pathRoutes}/violation-type`, violationTypeRoutes);
router.use(`${pathRoutes}/files`, filesRoutes);
router.use(`${pathRoutes}/inspections`, inspectionRoutes);

export default router;
