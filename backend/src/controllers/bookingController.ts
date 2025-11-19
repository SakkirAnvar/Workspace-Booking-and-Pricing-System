import { Request, Response, NextFunction } from "express";
import {
  createBooking,
  cancelBooking,
  getAllBookings,
} from "../services/bookingService";
import { isHttpError } from "../utils/httpError";

//Convert a Mongoose _id to string.
const idToString = (id: unknown): string => {
  return (id as any)?.toString?.() ?? "";
};

//POST /api/bookings
//Create a new booking.
export const createBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await createBooking(req.body);

    res.status(201).json({
      bookingId: idToString(booking._id),
      roomId: idToString(booking.roomId),
      userName: booking.userName,
      totalPrice: booking.totalPrice,
      status: booking.status,
    });
  } catch (err) {
    if (isHttpError(err)) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

//POST /api/bookings/:id/cancel
//Cancel an existing booking
export const cancelBookingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await cancelBooking(req.params.id);

    res.json({
      message: "Booking cancelled",
      bookingId: idToString(booking._id),
      status: booking.status,
    });
  } catch (err) {
    if (isHttpError(err)) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

//GET /api/bookings
//List all bookings (for admin view).
export const listBookingsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await getAllBookings();

    const mapped = bookings.map((b) => {
      const roomDoc = b.roomId as any;

      return {
        id: idToString(b._id),
        roomId: roomDoc?._id ? idToString(roomDoc._id) : idToString(b.roomId),
        roomName: roomDoc?.name,
        userName: b.userName,
        startTime: b.startTime,
        endTime: b.endTime,
        hours: b.hours,
        totalPrice: b.totalPrice,
        status: b.status,
      };
    });

    res.json(mapped);
  } catch (err) {
    next(err);
  }
};
