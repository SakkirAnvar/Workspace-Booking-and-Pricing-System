import React from "react";
import type { Tab } from "../App";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Book your Workspace,
            <br />
            <span className="text-slate-600">
              Where meetings meet simplicity.
            </span>
          </h2>
          <p className="max-w-xl text-sm text-slate-600">
            Reserve meeting rooms by the hour, avoid conflicts automatically,
            and keep an eye on utilization and revenue - all in one place.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("book")}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            Book
          </button>
        </div>

        <div className="mt-4 w-full md:mt-0 md:w-1/3">
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
            <p className="font-medium text-slate-700">Today&apos;s focus</p>
            <ul className="mt-2 space-y-1">
              <li>• Avoid double-booking conflicts</li>
              <li>• Use peak-hour pricing automatically</li>
              <li>• Track hours and revenue per room</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cards section */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Rooms card */}
        <button
          type="button"
          onClick={() => onNavigate("rooms")}
          className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
        >
          <h3 className="text-base font-semibold text-slate-900">Rooms</h3>
          <p className="mt-2 text-sm text-slate-600">
            See all available meeting rooms with their base hourly rates and
            capacity.
          </p>
        </button>

        {/* Booking card */}
        <button
          type="button"
          onClick={() => onNavigate("book")}
          className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
        >
          <h3 className="text-base font-semibold text-slate-900">Booking</h3>
          <p className="mt-2 text-sm text-slate-600">
            Quickly create a new booking with conflict prevention and dynamic
            pricing.
          </p>
        </button>

        {/* Admin card */}
        <button
          type="button"
          onClick={() => onNavigate("admin")}
          className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
        >
          <h3 className="text-base font-semibold text-slate-900">Admin</h3>
          <p className="mt-2 text-sm text-slate-600">
            Manage Bookings, Cancel when needed, and View Room Analytics over
            any date range.
          </p>
        </button>
      </section>
    </div>
  );
};

export default HomePage;
