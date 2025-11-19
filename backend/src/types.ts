export type BookingStatus = "CONFIRMED" | "CANCELLED"

export interface AnalyticsRow {
    roomId: String;
    roomName: String;
    totalHours: number;
    totalRevenue: number;
}