import { Router } from "express";
import { AudienceController } from "../controllers/files/audienceInformation.controller";
const router = Router();
const audienceController = new AudienceController();

router.post(
  "/verify/:status_digitalized",
  audienceController.getAudienceInformation
);
router.post("/all", audienceController.getAllAudienceInformation);

export default router;
