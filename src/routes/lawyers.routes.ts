import { Router } from "express";
import LawyersController from "../controllers/files/Lawyers/lawyers.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateLawyerDto } from "../dtos/Lawyers.dto";

const router = Router();
const lawyerController = new LawyersController();

router.get("/", lawyerController.getLawyers);
router.post(
  "/",
  validationMiddleware(CreateLawyerDto, "body"),
  lawyerController.createLawyer
);

export default router;
