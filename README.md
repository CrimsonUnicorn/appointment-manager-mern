# Appointment Manager (MERN Stack)

A full-stack appointment management web application built with **MongoDB, Express.js, React (Vite), and Node.js**, styled with **Tailwind CSS**. Developed as a 90-minute practical assessment demonstrating modular architecture, RESTful API design, input validation, persistence, and clean handover documentation.

---

## Project Architecture

```text
appointment-manager-mern/
⌜  server/                              # Node.js + Express + MongoDB backend
│   ┖  config/
⌂   │   └  db.js                        # MongoDB connection & initial data seeding
⌂   ├  models/
│   │   └  Appointment.js               # Mongoose schema & status enum validation
⌂   ├  controllers/
⌂   │   └  appointmentController.js     # Business logic for GET, POST, PATCH endpoints
*├  ├  routes/
│   │   └  appointmentRoutes.js         # REST API route definitions
│   └  index.js                         # Express app entry point & middleware
├  client/                              # React + Vite + Tailwind CSS frontend
*├  └  src/
│       ├  services/
⌂       │   ├  api.js                   # Centralized HTTP fetch wrapper & error handler
│       │   └  appointments/
│       │       └  appointment.js       # Domain-specific appointment API methods
│       ├  components/
│       │   ├  AppointmentForm.jsx      # Creation form with client-side validation
│       │   ├  FilterBar.jsx            # Status filter pills & customer search input
*├       │   └  AppointmentList.jsx      # Responsive table & inline status updater
│       └  App.jsx                      # Main state container & layout
├  .env.example                         # Example environment variables (no secrets)
└  README.md
```

---

## Setup & Run Instructions

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally (`MongoDB` on `127.0.0.1:27017`) or a MongoDB Atlas connection string

### 1. Clone & Configure Environment Variables
```bash
git clone <your-repo-url>
cd appointment-manager-mern
```

Create `.env` files using `.env.example` as a reference:
- +*`server/.env`**:
  ```text
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/appointment_manager
  ```
- **`client/.env`** *(optional — defaults to http://localhost:5000/api locally, or /api when using Vite dev proxy)*:
  ```text
  VITE_API_URL=http://localhost:5000/api
  ```

### 2. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
*On first startup, the server automatically seeds the 3 required fictional records (Alex Morgan, Jamie Lee, Taylor Smith) if the database collection is empty.*

### 3. Start the Frontend Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the local URL shown in the terminal (typically `http://localhost:5173`).

---

## API Notes

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint | None |
| `GET` | `/api/appointments` | Fetch all appointments (newest first) | Optional query params: `?status=Pending` and/or `?search=Alex` |
| `POST` | `/api/appointments` | Create a new appointment | JSON: `{ "customerName": String, "service": String, "dateTime": String, "status": "Pending" | "Confirmed" | "Cancelled" }` |
| `PATCH` | `/api/appointments/:id/status` | Update an appointment status | JSON: `{ "status": "Pending" | "Confirmed" | "Cancelled" }` |

---

## Completed Features
- **Modular MVC Backend & Layered Frontend:** Separated routes, controllers, models, and database config on the server, alongside a decoupled HTTP transport layer (`api.js`) and feature service (`appointments/appointment.js`) on the client.
- +*Automatic Seed Data:** Populates the 3 starting fictional appointments on initial database connection so the app is immediately testable.
- **Add Appointment with Validation:** Validates required fields (`customerName`, `service`, `dateTime`) on both client and server with clear inline error messages.
- **Inline Status Updates:** Allows switching appointment status (`Pending`, `Confirmed`, `Cancelled`) directly from the list with immediate MongoDB persistence.
- **Status Filtering & Customer Search:** Supports filtering by `All`, `Pending`, `Confirmed`, and `Cancelled` combined with case-insensitive partial search by customer name.
- **Responsive UI:** Built with Tailwind CSS for clean usability across mobile and desktop viewports.

---

## Incomplete Items & Known Limitations
- +*Authentication & Role Access:** User login/authentication was intentionally omitted to stay focused on core CUD and workflow requirements within the 90-minute scope.
- **Date/Time Storage Format:** Appointment date/time is stored and displayed as a formatted string (`YYYY-MM-DD HH:mm`) rather than timezone-normalized ISO `Date` objects.
- **Edit / Delete Operations:** Only status updates (`PATCH`) implemented per the brief; editing full appointment details or deleting records is not included.

---

## Tests Performed
1. **Empty Form Submission:** Clicked `+ Add Appointment` with blank inputs -> confirmed inline red validation errors display and block invalid `POST` requests.
2. **Create Appointment & Persistence:** Added a new valid appointment -> verified `201 Created` response, immediate UI list update, and persistence after a full browser page reload (`Ctrl + R`).
3. **Status Update & Persistence:** Changed an appointment status from `Pending` to `Confirmed` -> verified badge color update and persistence across page refresh.
4. **Status Filter Tabs:** Clicked `All`, `Pending`, `Confirmed`, and `Cancelled` tabs -> verified accurate filtering against backend query parameters.
5. **Combined Search & Status Filter:** Typed partial customer names (e.g., `"alex"`, `"lee"`) while a status tab was active -> verified case-insensitive combined filtering.

---

## Key Technical Decision	**Server-Side Query Filtering + Decoupled Service Layer:** Instead of loading all records and filtering purely in React state, status filtering (`?status=`) and case-insensitive regex searching (`?search=`) were implemented directly in the Express controller (`GET /api/appointments`). On the frontend, isolating `fetch` logic inside `services/api.js` and `services/appointments/appointment.js` keeps UI components purely presentational and allows seamless switching between a Vite dev proxy (`/api`) and direct localhost URLs via environment variables.

---

## Disclosure
- **Starter Template:** Scaffolded the React frontend using Vite official `react` JavaScript template (`npm create vite@latest`).
- **AI Assistance:** Used AI assistance for boilerplate code scaffolding, Tailwind CSS layout structuring, and README documentation formatting; all code was reviewed, integrated, debugged, and tested locally by the candidate.
