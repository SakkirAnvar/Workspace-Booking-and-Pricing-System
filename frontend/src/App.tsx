import React, { useState } from "react";
import RoomsPage from "./components/RoomPage";
import BookingForm from "./components/BookingForm";
import AdminView from "./components/AdminView";
import HomePage from "./components/HomePage";

export type Tab = "home" | "rooms" | "book" | "admin";

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>("home");

  const handleNavigate = (nextTab: Tab) => {
    setTab(nextTab);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            Workspace Booking
          </button>

          <nav className="flex items-center gap-3 text-sm">
            <button
              onClick={() => handleNavigate("rooms")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                tab === "rooms"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => handleNavigate("book")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                tab === "book"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Booking
            </button>
            <button
              onClick={() => handleNavigate("admin")}
              className={`rounded-md px-3 py-1 font-medium transition ${
                tab === "admin"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          {tab === "home" && <HomePage onNavigate={handleNavigate} />}
          {tab === "rooms" && <RoomsPage />}
          {tab === "book" && <BookingForm />}
          {tab === "admin" && <AdminView />}
        </div>
      </main>
    </div>
  );
};

export default App;
