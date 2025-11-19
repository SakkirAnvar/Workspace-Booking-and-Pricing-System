import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import type { AnalyticsRow, Booking } from "../types";

const AdminView: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsRow[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await api.get<Booking[]>("/api/bookings");
      setBookings(res.data);
    } catch {
      setError("Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id: string) => {
    setError(null);
    try {
      await api.post(`/api/bookings/${id}/cancel`);
      await loadBookings();
      setMessage("Booking cancelled successfully");
    } catch (err: unknown) {
      let message = "Failed to cancel booking";

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as Record<string, unknown>).response === "object"
      ) {
        const typedErr = err as {
          response?: { data?: { error?: string } };
        };

        if (typedErr.response?.data?.error) {
          message = typedErr.response.data.error;
        }
      }

      setError(message);
    }
  };

  const loadAnalytics = async () => {
    if (!from || !to) {
      setError("Please provide from and to dates");
      return;
    }
    setError(null);
    try {
      setLoadingAnalytics(true);
      const res = await api.get<AnalyticsRow[]>("/api/analytics", {
        params: { from, to },
      });
      setAnalytics(res.data);
    } catch {
      setError("Failed to load analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-slate-800">Admin View</h2>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {message && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700 border border-green-300">
          {message}
        </div>
      )}

      {/* Bookings */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-slate-800">Bookings</h3>

        {loadingBookings ? (
          <p className="text-sm text-slate-600">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-sm text-slate-600">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    User
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    Room
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    Start
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    End
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">
                    Hours
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">
                    Price
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    Status
                  </th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr
                    key={b.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-3 py-2">{b.userName}</td>
                    <td className="px-3 py-2">{b.roomName || b.roomId}</td>
                    <td className="px-3 py-2">
                      {new Date(b.startTime).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(b.endTime).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {b.hours.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right">₹{b.totalPrice}</td>
                    <td
                      className={`px-3 py-2 font-medium ${
                        b.status === "CONFIRMED"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                    </td>

                    <td className="px-3 py-2 text-right">
                      {b.status === "CONFIRMED" && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="inline-flex items-center rounded border border-red-400-md bg-red-700 px-4 py-1 text-xs font-medium text-white hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Analytics */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-slate-800">Analytics</h3>

        <div className="flex flex-wrap items-end gap-3 text-sm">
          <label className="flex flex-col gap-1">
            <span className="font-medium">From</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-40 rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-900 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium">To</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-40 rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-900 focus:outline-none"
            />
          </label>
          <button
            onClick={loadAnalytics}
            disabled={loadingAnalytics}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAnalytics ? "Loading..." : "Fetch Analytics"}
          </button>
        </div>

        {analytics.length === 0 ? (
          <p className="text-sm text-slate-600">
            No analytics data for selected range.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-600">
                    Room
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">
                    Total Hours
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-slate-600">
                    Total Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((row, idx) => (
                  <tr
                    key={row.roomId}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-3 py-2">{row.roomName}</td>
                    <td className="px-3 py-2 text-right">
                      {row.totalHours.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      ₹{row.totalRevenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminView;
