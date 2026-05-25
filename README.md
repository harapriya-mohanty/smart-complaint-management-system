# Smart Complaint System (Full Stack)

This repo is a simple full-stack setup:

- `frontend/` — React + Vite UI
- `backend/` — Node + Express API + MongoDB (Mongoose)

## Prerequisites

- Node.js (LTS)
- MongoDB (local MongoDB or MongoDB Atlas)

## Environment setup

### Backend

1. `cd backend`
2. Copy `backend/.env.example` → `backend/.env`
3. Fill values:
   - `MONGO_URI=...`
   - `JWT_SECRET=...`

### Frontend

1. `cd frontend`
2. Copy `frontend/.env.example` → `frontend/.env`
3. Ensure API URL matches backend:
   - `VITE_API_URL=http://localhost:5000/api`

## Run (development)

From the repo root (`smart-complaint-system/`):

1. Install dependencies:
   - `npm run install:all`
2. Run both servers:
   - `npm run dev`

Or run separately:

- Backend: `cd backend` → `npm run dev`
- Frontend: `cd frontend` → `npm run dev`

## Build + run (production)

1. Build frontend: `npm run build`
2. Start backend (serves API + built frontend): `npm run start`

## Notes

- Secrets must stay in `.env` and should not be committed.
- Backend health check: `http://localhost:5000/`
