import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Room, BookingResponse } from "../types";

const BookingForm: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get<Room[]>("/api/rooms");
        setRooms(res.data);
      } catch {
        setError("Failed to load rooms");
      }
    };
    fetchRooms();
  }, []);

  //clear success message after 3 seconds
  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => setResult(null), 3000);
    return () => clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    api
      .get<Room[]>("/api/rooms")
      .then((res) => setRooms(res.data))
      .catch(() => setError("Failed to load rooms"));
  }, []);

  const resetForm = () => {
    setRoomId("");
    setUserName("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const res = await api.post<BookingResponse>("/api/bookings", {
        roomId,
        userName,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      });

      setResult(
        `Booking confirmed  ID: ${res.data.bookingId}  Price: ₹${res.data.totalPrice}`
      );

      resetForm();
    } catch (err: unknown) {
      let message = "Failed to create booking";

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as Record<string, unknown>).response === "object"
      ) {
        const axiosErr = err as { response?: { data?: { error?: string } } };
        message = axiosErr.response?.data?.error ?? message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md border border-slate-200"
      >
        <h2 className="text-xl font-semibold text-center text-slate-900">
          Create Booking
        </h2>

        {result && (
          <p className="p-3 text-green-700 bg-green-100 rounded-md">{result}</p>
        )}
        {error && (
          <p className="p-3 text-red-700 bg-red-100 rounded-md">{error}</p>
        )}

        <div>
          <label className="text-sm font-medium">Select Room</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          >
            <option value="">Choose a Room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name} — ₹{room.baseHourlyRate}/hr
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input
            type="text"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter name"
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            required
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            required
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 p-2"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-md bg-slate-900 py-2 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Workspace"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
