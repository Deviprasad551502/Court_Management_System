# Court Management System

Container-first layout for running the frontend (Angular), backend (NestJS), and optional Postgres.

## Structure
- frontend/: Angular app and Dockerfile
- backend/: NestJS app and Dockerfile
- database/: init scripts and backups (volumes mount into Postgres)
- docker/: shared Docker configs (e.g., nginx for frontend)
- docker-compose.yml: orchestrates the stack
- .env: shared environment variables

## Quick start
1) Copy .env (adjust secrets if needed).
2) Build and run: `docker compose up --build`.
3) Frontend: http://localhost:${FRONTEND_PORT:-4200}
4) Backend: http://localhost:${BACKEND_PORT:-3000}

## Notes
- Place SQL or seed scripts in database/init to auto-run on first DB start.
- Backups written to database/backups (kept via bind mount).
- Update docker/frontend/nginx.conf if frontend routes/assets change.
