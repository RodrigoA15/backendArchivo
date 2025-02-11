import { Router } from "express";
import audienceController from "../controllers/files/audienceInformation.controller";
const router = Router();

router.post("/", audienceController.getAllAudienceInformation);

export default router;
