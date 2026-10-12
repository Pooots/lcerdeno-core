# LCerdeno frontend (`lcerdeno-core`)

React + Vite UI for LCerdeno. Foundation mirrors LPay (`lpay-core`).

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000 — the home page shows frontend status and polls `/api/health` via the Vite proxy (`VITE_APP_URL` → Laravel).
