# Flora Backend

REST API for the Flora flower shop — Express + PostgreSQL + Sequelize.

## Quick start (local)

```bash
cd flora-backend
cp .env.example .env        # fill in DB_URL and BASE_URL
npm install
npm run dev                 # starts on http://localhost:3000
```

Swagger UI: http://localhost:3000/api/docs

## Environment variables

| Variable       | Description                              | Default                      |
|----------------|------------------------------------------|------------------------------|
| PORT           | Server port                              | 3000                         |
| HOST           | Server host                              | localhost                    |
| NODE_ENV       | Environment                              | development                  |
| CORS_ORIGIN    | Allowed CORS origins (comma-sep or *)    | *                            |
| DB_URL         | PostgreSQL connection string             | —                            |
| BASE_URL       | Public server URL (for photo links)      | http://localhost:3000        |
| DEFAULT_PAGE   | Default pagination page                  | 1                            |
| DEFAULT_LIMIT  | Default items per page                   | 6                            |
| MAX_LIMIT      | Maximum items per page                   | 50                           |

## Endpoints

| Method | Path                          | Description              |
|--------|-------------------------------|--------------------------|
| GET    | /api/health                   | Liveness probe           |
| GET    | /api/bouquets                 | List (page/limit/filter) |
| GET    | /api/bouquets/:id             | Get one                  |
| POST   | /api/bouquets                 | Create                   |
| PUT    | /api/bouquets/:id             | Update (min 1 field)     |
| DELETE | /api/bouquets/:id             | Delete                   |
| PATCH  | /api/bouquets/:id/favorite    | Toggle favorite          |
| PATCH  | /api/bouquets/:id/photo       | Upload photo             |
| GET    | /api/docs                     | Swagger UI               |

## Deploy to Render

1. Create a PostgreSQL database on Render → copy the External DB URL.
2. Create a new Web Service → connect your GitHub repo.
3. Set env vars in Render dashboard: `DB_URL`, `NODE_ENV=production`, `BASE_URL=https://your-app.onrender.com`.
4. Build command: `npm install` · Start command: `npm start`.
