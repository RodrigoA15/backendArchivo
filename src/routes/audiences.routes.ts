import { Router } from "express";
import audienceController from "../controllers/files/audienceInformation.controller";
const router = Router();

router.get("/:numero_comparendo", audienceController.getAllAudienceInformation);

export default router;
