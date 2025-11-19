import { Booking } from "../models/Booking";
import { AnalyticsRow } from "../types";

export const getAnalytics = async (
  from: Date,
  to: Date
): Promise<AnalyticsRow[]> => {
  const rows = await Booking.aggregate([
    {
      $match: {
        status: "CONFIRMED",
        startTime: { $gte: from, $lte: to },
      },
    },
    {
      $group: {
        _id: "$roomId",
        totalHours: { $sum: "$hours" },
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "_id",
        as: "room",
      },
    },
    {
      $project: {
        roomId: "$_id",
        roomName: { $arrayElemAt: ["$room.name", 0] },
        totalHours: 1,
        totalRevenue: 1,
      },
    },
  ]);

  return rows.map((r: any) => ({
    roomId: r.roomId.toString(),
    roomName: r.roomName,
    totalHours: r.totalHours,
    totalRevenue: r.totalRevenue,
  }));
};
