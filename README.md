# Nivesh Sarthi Website

This repo is now split into two folders:

- `frontend/` - React/Vite website, mirrored pages, assets, and Docker/Nginx deployment files.
- `backend/` - local JSON API and property/lead data storage.

## Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

The Vite dev server proxies `/api` requests to the backend at `http://127.0.0.1:5174`.

## Backend

```bash
cd backend
npm run start
```

The API runs at `http://127.0.0.1:5174/api/health`.

## Deployment

Frontend and backend can be deployed as two separate services.

### Frontend Service

Use the root `Dockerfile` when the Docker build context is the repository root. If Coolify is pointed at `frontend/` instead, use `frontend/Dockerfile`.

```bash
docker build -t nivesh-sarthi-frontend .
docker run -p 8080:80 nivesh-sarthi-frontend
```

Set this build argument or environment variable during the frontend build:

```bash
VITE_API_BASE_URL=https://your-backend-domain.com
```

When it is empty, the frontend uses same-origin `/api`, which is useful for local development with the Vite proxy.

### Backend Service

Use `backend/Dockerfile` when the Docker build context is `backend/`:

```bash
cd backend
docker build -t nivesh-sarthi-backend .
docker run -p 5174:80 nivesh-sarthi-backend
```

The deployed API health check is `/api/health`.

Set this backend environment variable:

```bash
ADMIN_TOKEN=your-strong-admin-password
```

Use the same value to log in at `/admin`. Local development uses `admin123` if `ADMIN_TOKEN` is not set.

Property data lives in `backend/data/properties.json`. Leads are written to `backend/data/leads.json`. For production, mount persistent storage to `/app/backend/data` so admin changes and leads survive container rebuilds.
