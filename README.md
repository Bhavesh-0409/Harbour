# Harbor: Student Triage & Routing
ServiceNow Co-Innovation Day, Track 1. Web app only.

**Stack:** React + Vite + Tailwind + shadcn-style UI + Framer Motion, FastAPI, SQLite (Supabase-ready).

## Run it
```bash
# Backend (terminal 1)
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload            # API docs: http://localhost:8000/docs

# Frontend (terminal 2)
cd frontend
npm install
npm run dev                              # http://localhost:5173
```
Vite proxies `/api` to port 8000, so no config is needed locally. Demo cases are seeded on first start.

## What's built
| Feature | Where |
|---|---|
| Student intake | `frontend/src/pages/Intake.jsx` |
| Urgency scoring (rules) | `backend/app/scoring.py` |
| Department routing + wait times | `backend/app/routing.py` |
| Why this route (Gemini optional) | `backend/app/reasoning.py` |
| Crisis bypass | `pages/Crisis.jsx` (edit the phone numbers) |
| Staff view + Who saw this | `pages/Staff.jsx`, `views` table |
| Scoped handoff, One-tap revoke | `pages/Result.jsx` |
| Live capacity | `/api/capacity`, polled every 5s |

## Design tokens
In `frontend/tailwind.config.js`: white, mist `#F3F7FF`, brand blue `#2F6BFF`, navy `#0A1A3F`, neon `#3CE0FF`. Font: Manrope. Neon is used sparingly (glow, focus, crisis). Add more shadcn components with `npx shadcn@latest add <name>`.

## Next steps
1. Tune keywords and thresholds in `scoring.py`.
2. Replace crisis numbers in `Crisis.jsx` with your campus's.
3. Real staff auth (Supabase Auth); `STAFF` in `Staff.jsx` is hardcoded.
4. Swap `db.py` for Supabase, and polling for Realtime.
5. Deploy: Vercel (set `VITE_API_URL`) + Railway/Render (set `FRONTEND_ORIGIN`).

> Scoring is a keyword heuristic for a demo, not a clinical tool. Keep a human in the loop.
