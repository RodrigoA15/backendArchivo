import { Router } from "express";
import { ResolutionController } from "../controllers/files/Resolutions/resolutions.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { ResolutionsDto } from "../dtos/Resolutions.dto";

const router = Router();
const resolutionController = new ResolutionController();

router.post(
  "/",
  validationMiddleware(ResolutionsDto, "body"),
  resolutionController.createResolution
);

export default router;
