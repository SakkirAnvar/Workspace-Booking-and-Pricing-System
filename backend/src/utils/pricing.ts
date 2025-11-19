import { IRoom } from "../models/Room";

const isPeakHour = (d: Date): boolean => {
  const day = d.getDay();
  const hour = d.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const inPeak1 = hour >= 10 && hour < 13;
  const inPeak2 = hour >= 16 && hour < 19;
  return isWeekday && (inPeak1 || inPeak2);
};

export const computeDynamicPrice = (
  room: IRoom,
  start: Date,
  end: Date
): { totalPrice: number; hours: number } => {
  const totalMs = end.getTime() - start.getTime();
  const totalHours = totalMs / (1000 * 60 * 60);

  let cursor = new Date(start.getTime());
  let price = 0;

  while (cursor < end) {
    const slotEnd = new Date(cursor.getTime());
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);

    const slotHours = 0.5;
    const multiplier = isPeakHour(cursor) ? 1.5 : 1.0;
    price += room.baseHourlyRate * multiplier * slotHours;

    cursor = slotEnd;
  }

  return { totalPrice: Math.round(price), hours: totalHours };
};
