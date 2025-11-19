import { Router } from "express";
import { analyticsHandler } from "../controllers/analyticsController";

const router = Router();

router.get("/", analyticsHandler);

export default router;
