# GarageIQ — Installation and Local Development

**Project:** CSC 4110 Software Engineering Lab · Wayne State University  
**Repository:** https://github.com/WSU-4110/GarageIQ  
**Companion overview:** [README.md](README.md)

## 1. Purpose

This document lets another developer clone GarageIQ, install its dependencies, build and test the frontend, and run a local demonstration. It also explains the configuration needed for the live Firebase-backed application and the separate FastAPI service. The public deployed website does **not** remove the need for these local steps.

## 2. System requirements

- Git, a terminal, and a modern browser (Chrome, Safari, Firefox, or Edge).
- **Node.js 24** and npm (the repository's frontend CI uses Node.js 24).
- **Python 3.12** and `pip` for the backend (the backend Dockerfile uses Python 3.12).
- Internet access to install dependencies, and to use Firebase or Google Places.
- Optional: a Firebase project with Authentication and Firestore configured; authorized Google Cloud credentials for the backend; a Google Maps Platform Places API (New) key for live shop search.

The frontend can be installed, built, unit-tested, and explored in local demo mode without sharing another developer's credentials. Some API-backed features, notably live shop searches and the hosted modification advisor, require the running FastAPI service and its configuration.

## 3. Clone the repository

```bash
git clone https://github.com/WSU-4110/GarageIQ.git
cd GarageIQ
```

To develop a new issue, first update `main` and create a separate branch:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c feature/issue-number-short-description
```

## 4. Frontend: quick local demo (no Firebase credentials required)

From the repository root:

```bash
cd frontend
npm ci
cp .env.example .env.local
```

Append this line to `frontend/.env.local`:

```dotenv
VITE_LOCAL_DEMO_MODE=true
```

Then:

```bash
npm run test
npm run lint
npm run build
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Demo-mode profile data is stored in that browser's local storage, not in the production Firebase database. Use a separate browser profile if you want to avoid mixing demo data with other local testing. `npm run build` generates `frontend/dist/`; it is **not** committed.

> **Limit:** Demo mode exercises the React interface and local profile behavior, but a locally hosted FastAPI API must be configured for live backend-backed recommendations and Google Places shop results. Do not claim demo mode reproduces every deployed feature offline.

## 5. Frontend: Firebase-connected development

If testing real user authentication and cloud profile persistence, obtain the team's approved Firebase **web application configuration**, not service-account private keys.

1. In `frontend`, run `cp .env.example .env.local` (skip if it already exists).
2. Set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_DATABASE_ID` in `.env.local`. The checked-in example uses project `garageiq-510316` and database `garageiq`.
3. Remove or set `VITE_LOCAL_DEMO_MODE=false`.
4. Confirm Firebase Authentication supports the intended sign-in method, `localhost` is an authorized domain where required, and Firestore access rules allow only the signed-in user's profile.
5. Restart `npm run dev` after changing `.env.local`.

The frontend currently uses Firebase Authentication and Firestore for vehicle and maintenance profiles. It does **not** require locally installing MySQL for these functions. The older architecture diagram in the root README describes earlier/planned MySQL work and should not be interpreted as the current frontend data path.

**Security:** Never commit `.env.local`, Firebase Admin service-account JSON files, Google Places server keys, passwords, or access tokens. Browser `VITE_*` values are exposed to the browser; do not put private service keys in them.

## 6. Backend: local development and tests

The backend is a Python/FastAPI application under `backend/`. It includes its own mod-advisor API and shop-search API.

```bash
# From the repository root
cd backend
python3.12 -m venv venv
source venv/bin/activate   # macOS / Linux
python -m pip install -r requirements.txt
cp .env.example .env
```

For Windows PowerShell, activate with `venv\Scripts\Activate.ps1`. For local testing, the default settings use an in-memory vehicle store and deterministic recommendation generator. `GARAGEIQ_REQUIRE_AUTH=false` is appropriate **only** for local testing.

```bash
pytest -q
```

The current backend's `app/firebase_config.py` initializes Firebase Admin using Google **Application Default Credentials** at import time. As a result, starting the full backend requires valid authorized Google Cloud credentials even when using the memory vehicle store; a clean machine without these credentials may fail at startup. The team should address this coupling separately if fully credential-free backend execution is a goal.

On an authorized development machine, configure Google Application Default Credentials through your institution/team's approved process, then start:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Verify `http://127.0.0.1:8000/health` and inspect `http://127.0.0.1:8000/docs` for endpoints. The frontend's development proxy forwards `/api/*` to `http://127.0.0.1:8000/*`; run frontend and backend in separate terminals for a complete local development session.

### Shop finder configuration

Set `GARAGEIQ_GOOGLE_PLACES_API_KEY` in `backend/.env` for **Places API (New)**. The Python API invokes Google's Places Text Search; the key must stay server-side. Enable the corresponding API and billing in the authorized Google Cloud project. Without the key the shop endpoint returns a configuration error, not fabricated listings. Do not put this key in `frontend/.env.local` as `VITE_*`.

## 7. Build, test, and verify

| Component | Command (working directory) | Expected purpose |
|---|---|---|
| Frontend dependency install | `npm ci` (`frontend`) | Install locked dependencies |
| Frontend tests | `npm test` (`frontend`) | Run Node-based unit tests |
| Frontend lint | `npm run lint` (`frontend`) | Check JS/JSX source |
| Production bundle | `npm run build` (`frontend`) | Generate `dist/` |
| Local site | `npm run dev` (`frontend`) | Launch Vite |
| Backend tests | `pytest -q` (`backend`) | Run Python tests; credential requirements noted above |
| Backend server | `uvicorn app.main:app --reload --port 8000` (`backend`) | Start FastAPI |

Suggested manual smoke checks: create/switch vehicle; record a service; add an installed versus planned modification; verify FR13 maintenance checks and modified intervals; hide/restore a reminder; create and complete a one-time check; refresh and ensure data persists in the chosen mode; verify search and empty/error states. For the live shop finder, use a non-sensitive ZIP/city and confirm results only when the backend and Places API are configured.

## 8. Troubleshooting

- **`npm ci` fails:** check `node --version` (use Node.js 24) and that you ran it inside `frontend`.
- **Firebase not configured:** check `frontend/.env.local`, then restart Vite. For a credential-free UI demonstration set `VITE_LOCAL_DEMO_MODE=true`.
- **Request to `/api/shops` fails:** ensure FastAPI is running or the deployed frontend points to the current backend URL. The Vite proxy is *development-only*; Vercel does not automatically inherit it.
- **Shop search returns HTTP 503:** verify the backend environment contains `GARAGEIQ_GOOGLE_PLACES_API_KEY`.
- **Shop search returns HTTP 502:** check Places API enablement, billing, key restrictions, and backend logs.
- **Backend Firebase credential error:** use authorized Application Default Credentials; do not distribute private service keys in the repository.
- **Port in use:** stop the existing dev process or use a different free port and update any necessary CORS/proxy settings.

## 9. Contribution and pull request workflow

1. Link work to a GitHub issue and identify its owner/acceptance criteria.
2. Create a short-lived feature or documentation branch from current `main`.
3. Commit scoped changes; exclude credentials and generated build output.
4. Run relevant lint, tests, build, and manual checks.
5. Open a pull request to `main`, with issue link and testing notes.
6. Have a **different teammate** submit a review/approval **before merging**; log the PR and reviewer in the team tracker.
7. Merge after review and update/close the corresponding GitHub issue.

Additional project context: [frontend/README.md](frontend/README.md), [Sprint 1 retrospective](docs/retrospective-sprint-1.md).
