# Elite Pro Infra React Mirror

This project is a React/Vite static mirror of `https://www.eliteproinfra.com/`.

## Commands

```bash
npm run mirror
npm run backend
npm run build
npm run serve -- 4180
```

- `npm run mirror` crawls the live website, stores copied pages in `public/mirror/pages`, and downloads local assets under `public/assets`.
- `npm run build` creates the production build in `dist`.
- `npm run serve -- 4180` serves the built copy and the local JSON API at `http://127.0.0.1:4180/`.
- `npm run backend` starts only the API at `http://127.0.0.1:5174/` for Vite development.
- The admin panel is available at `http://127.0.0.1:4180/admin`.
- Property data is stored in `data/properties.json`; leads are stored in `data/leads.json`.

The React app reads `public/mirror/routes.json`, loads the matching mirrored HTML page, and intercepts internal links so the copied pages behave like client-side routes.
