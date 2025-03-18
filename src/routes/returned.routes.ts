import { Router } from "express";
import { ReturnedController } from "../controllers/files/Returned/returned.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { ReturnedDto } from "../dtos/Returned.dto";

const router = Router();
const returnedController = new ReturnedController();

router.post(
  "/",
  validationMiddleware(ReturnedDto, "body"),
  returnedController.createReturnedFile
);

router.get("/files", returnedController.getReturnedFile);
export default router;
