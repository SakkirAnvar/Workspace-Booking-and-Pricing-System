# Workspace Booking & Pricing System

A full-stack application that enables users to book workspace rooms by the hour with automatic conflict detection, dynamic pricing rules, cancellation policies, and admin analytics.


---

## 🚀 Live Deployment

| Layer        | URL                                                          |
|--------------|------------------                                            |
| Frontend     | 🔗 https://workspacebooking.vercel.app/                      |
| Backend API  | 🔗 https://workspace-booking-and-pricing-system.onrender.com |


---

## 🧠 Features

### ✔ Workspace Rooms
- View room list (name, capacity, pricing)
- Seeded data for demo

### ✔ Booking System
- Prevents overlapping bookings
- Max allowed booking duration: **12 hours**
- Allows start/end touching (e.g., 10–11 and 11–12)

### ✔ Dynamic Pricing (Real-world)

Peak pricing multiplier (1.5×) applies during:

|   Days  |       Peak Hours           |
|------   |------------                |
| Mon–Fri | **10AM–1PM** & **4PM–7PM** |

Billing uses **30-minute prorated increments**.

### ✔ Cancellation Rules
- Allowed only if **more than 2 hours** remain before start time
- Cancelled bookings remain visible with `"CANCELLED"` status
- Cancelled items excluded from analytics

### ✔ Admin Analytics
- Date-range analytics dashboard
- Revenue and utilized hours per room

---

## 🧩 Tech Stack

|  Layer     | Technology                       |
|------------|-----------|
| Frontend   | React + TypeScript + TailwindCSS |
| Backend    | Node.js + Express + TypeScript   |
| Database   | MongoDB (Atlas or Local)         |
| Client     | Axios                            |
| Deployment | Vercel / Netlify + Render        |

---

## 📦 Folder Structure

/backend
└─ src
├─ controllers
├─ services
├─ models
├─ routes
├─ utils
└─ config

/frontend
└─ src
├─ components
├─ api
├─ types
└─ styles

---

## ⚙️ Setup Instructions

### 1️⃣ Backend

```sh
cd backend
npm install

Create .env:
MONGO_URI=mongodb://localhost:27017/workspaceBooking
PORT=4000

Seed sample rooms (optional):
npm run seed:rooms

Start backend:
npm run dev

2️⃣ Frontend

cd frontend
npm install
npm run dev

Open in browser:
👉 http://localhost:5173

🧪 API Reference
Method	          Route           	       Description
GET	          /api/rooms	            Fetch all rooms
POST	      /api/bookings	            Create booking
POST	      /api/bookings/:id/cancel	Cancel booking
GET	          /api/bookings	            Get all bookings
GET	          /api/analytics	        Analytics by date range

Example POST /api/bookings:
{
  "roomId": "101",
  "userName": "Priya",
  "startTime": "2025-11-20T10:00:00.000Z",
  "endTime": "2025-11-20T12:30:00.000Z"
}

📌 Notes & Assumptions
- Timezone used: Asia/Kolkata
- Booking pricing is rounded to nearest INR
- UI focuses on clarity, not heavy UI styling
- Authentication intentionally excluded for assignment scope

🤖 AI Usage Statement
AI tools were used for:
- Generating documentation
- Naming conventions
- Structure planning
- Final logic and formatting were reviewed and implemented manually.