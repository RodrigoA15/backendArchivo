import { Router } from "express";
import { EvidenceFileController } from "../controllers/files/EvidenceFiles/evidenceFiles.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { EvidenceFilDto } from "../dtos/EvidenceFile.dto";

const router = Router();

const evidenceController = new EvidenceFileController();

router.post(
  "/",
  validationMiddleware(EvidenceFilDto, "body"),
  evidenceController.createEvidence
);

router.post("/file", evidenceController.importFile);

export default router;
