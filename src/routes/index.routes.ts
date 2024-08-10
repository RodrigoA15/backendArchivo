import { Router } from "express";
import fileRoutes from "./archivo.routes";
const router = Router();

const pathRoutes = "/api/v1";

router.use(`${pathRoutes}/file`, fileRoutes);

export default router;
