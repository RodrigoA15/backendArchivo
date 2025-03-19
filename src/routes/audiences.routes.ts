import { Router } from "express";
import audienceController from "../controllers/files/audienceInformation.controller";
const router = Router();

router.post("/:status_digitalized", audienceController.getAudienceInformation);
router.post("/all", audienceController.getAllAudienceInformation);

export default router;
