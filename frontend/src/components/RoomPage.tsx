import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Room } from "../types";

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await api.get<Room[]>("/api/rooms");
        setRooms(res.data);
      } catch {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <p className="text-sm text-slate-600">Loading rooms...</p>;
  if (error)
    return <p className="text-sm font-medium text-red-600">{error}</p>;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-800">Rooms</h2>

      {rooms.length === 0 ? (
        <p className="text-sm text-slate-600">No rooms found.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600">
                  Name
                </th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">
                  Base Rate / hr
                </th>
                <th className="px-3 py-2 text-right font-medium text-slate-600">
                  Capacity
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, idx) => (
                <tr
                  key={room._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                >
                  <td className="px-3 py-2">{room.name}</td>
                  <td className="px-3 py-2 text-right">
                    ₹{room.baseHourlyRate}
                  </td>
                  <td className="px-3 py-2 text-right">{room.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
