import { Router } from "express";
import {
  createBookingHandler,
  cancelBookingHandler,
  listBookingsHandler
} from "../controllers/bookingController";

const router = Router();

router.get("/", listBookingsHandler);
router.post("/", createBookingHandler);
router.post("/:id/cancel", cancelBookingHandler);

export default router;
