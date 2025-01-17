import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { CounterController } from "../controllers/files/Counters/counter.controller";
import { CounterDto } from "../dtos/Counters.dto";

const router = Router();

const counterController = new CounterController();
router.post(
  "/",
  validationMiddleware(CounterDto, "body"),
  counterController.createSequence
);

export default router;
