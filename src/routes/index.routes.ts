import { Router } from "express";
import fileRoutes from "./archivoRoutes";
const router = Router();

const pathRoutes = "/api/v1";

router.use(`${pathRoutes}/file`, fileRoutes);

export default router;
