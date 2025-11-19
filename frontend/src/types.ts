export interface Room {
  _id: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export type BookingStatus = "CONFIRMED" | "CANCELLED";

export interface Booking {
  id: string;
  roomId: string;
  roomName?: string;
  userName: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalPrice: number;
  status: BookingStatus;
}

export interface AnalyticsRow {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}

export interface BookingResponse {
  bookingId: string;
  roomId: string;
  userName: string;
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED";
}
