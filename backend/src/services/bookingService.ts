import { Booking, IBooking } from "../models/Booking";
import { Room } from "../models/Room";
import { computeDynamicPrice } from "../utils/pricing";
import { diffHours, formatTime } from "../utils/time";
import { createHttpError } from "../utils/httpError";

interface createBookingInput {
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
}

export const createBooking = async (input: createBookingInput): Promise<IBooking> => {
  const { roomId, userName, startTime, endTime } = input;

  const start = new Date(startTime);
  const end = new Date(endTime);

  //validation
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw createHttpError("Invalid start time or end time");
  }

  if (end <= start) {
    throw createHttpError("End time must be after start time");
  }

  if (diffHours(start, end) > 12) {
    throw createHttpError("Booking duration cannot exceed 12 hours");
  }

  // Room existence check
  const room = await Room.findById(roomId);
  if (!room) {
    throw createHttpError("Room not found", 404);
  }

  // Conflict check:
  const conflict = await Booking.findOne({
    roomId: room._id,
    status: "CONFIRMED",
    startTime: { $lt: end },
    endTime: { $gt: start },
  });

  if (conflict) {
    const conflictStart = formatTime(conflict.startTime);
    const conflictEnd = formatTime(conflict.endTime);
    throw createHttpError(
      `Room already booked from ${conflictStart} to ${conflictEnd}`,
      409
    );
  }

  // Dynamic pricing (IST-aware, 30-minute slots)
  const { totalPrice, hours } = computeDynamicPrice(room, start, end);

  // Persist booking
  const booking = await Booking.create({
    roomId: room._id,
    userName,
    startTime: start,
    endTime: end,
    hours,
    totalPrice,
    status: "CONFIRMED",
  });

  return booking;
};

//Cancel a booking only if more than 2 hours before start time.
export const cancelBooking = async (id: string): Promise<IBooking> => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw createHttpError("Booking not found", 404);
  }

  const now = new Date();

  const hoursUntilStart = diffHours(now, booking.startTime);

  if (hoursUntilStart <= 2) {
    throw createHttpError(
      "Cannot cancel within 2 hours of the booking start time",
      400
    );
  }

  booking.status = "CANCELLED";
  await booking.save();

  return booking;
};

//List all bookings
export const getAllBookings = async (): Promise<IBooking[]> => {
  return Booking.find().sort({ startTime: 1 }).populate("roomId").exec();
};
