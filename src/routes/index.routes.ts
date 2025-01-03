import { Router } from "express";
import fileRoutes from "./archivo.routes";
import audienceRoutes from "./audiences.routes";
import lawyersRoutes from "./lawyers.routes";

const router = Router();
const pathRoutes = "/api/v1";

router.use(`${pathRoutes}/file`, fileRoutes);
router.use(`${pathRoutes}/audience`, audienceRoutes);
router.use(`${pathRoutes}/lawyers`, lawyersRoutes);

export default router;
