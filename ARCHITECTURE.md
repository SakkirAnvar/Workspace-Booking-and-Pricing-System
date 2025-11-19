```md
# Architecture Overview

This project follows a clean, layered architecture for clarity, maintainability, and scalability.

---

## 🧱 Layer Model

Client → Controller → Service → Database (Models)
↓
Utilities

### ▸ Controllers  
Handle request validation + responses.

### ▸ Services  
Contain **business logic**, pricing rules, conflict detection, and policy validation.

### ▸ Models  
MongoDB schemas for `Room` and `Booking`.

### ▸ Utilities  
Reusable logic such as pricing computation and error handlers.

---

## 🗂 Backend Structure
src/
├── models
├── services
├── controllers
├── routes
├── utils
└── config

---


### 🏷 Booking Validation

A booking is considered conflicting if:
(existing.start < new.end) && (new.start < existing.end)

Boundary rule:

existing.end === new.start → allowed

---

### ⏳ Duration Rule

Booking duration <= 12 hours

---

### ❌ Cancellation Enforcement

Booking may be cancelled only if:
cancel_time < start_time - 2 hours

---

## 💰 Dynamic Pricing Logic

Pricing is calculated in **30 minute billing slots**:

while (cursor < end):
if cursor in peak hours:
price += baseRate * 1.5 * 0.5
else:
price += baseRate * 0.5
cursor += 30min

Peak hours:

| Days    | Hours                |
|---------|----------------------|
| Mon–Fri | **10–13**, **16–19** |

---

## 📊 Analytics Logic

`CONFIRMED` bookings only.

Output example:

```json
[
  {
    "roomId": "101",
    "roomName": "Cabin 1",
    "totalHours": 15.5,
    "totalRevenue": 5250
  }
]

🎨 Frontend Architecture

- React functional components
- Tailwind utility class styling
- Axios API client abstraction
- Local state for view-switching
- Auto-dismiss notifications for UX clarity

Views:

Screen	    Purpose
Home	    Navigation
Booking	    Create bookings
Rooms	    View rooms
Admin	    Manage + analytics


🔁 Data Flow
User → UI → Axios → Express → Service → MongoDB
                                 ↓
                        Response → UI feedback

🧱 Scalability Roadmap

- Future Feature	Benefit
- WebSockets	Live room availability
- Redis caching	Faster analytics & conflict lookups
- Auth + roles	Multi-tenant use
- Pagination & filters	Better admin usability


🧠 Design Reasoning

- This architecture ensures:
- Business logic is not inside routes
- Code is testable and modular
- Behavior is explicit and predictable

