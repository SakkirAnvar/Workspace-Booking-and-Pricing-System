import mongoose, { Schema, Document, mongo } from "mongoose";
import { BookingStatus } from "../types";

export interface IBooking extends Document {
  roomId: mongoose.Types.ObjectId;
  userName: string;
  startTime: Date;
  endTime: Date;
  hours: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["CONFIRMED", "CANCELLED"],
    default: "CONFIRMED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
