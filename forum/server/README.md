# Forum API — F2 foundation

Sibling runtime for auth, sessions, and RBAC. The Vite UI in `../` stays the shell (F1/G0c); mutating routes land here.

## Stack gate (locked for F2)

| Layer | Choice |
|---|---|
| API | Node + Hono |
| DB | PostgreSQL (prod) / SQLite via Prisma for local |
| ORM | Prisma |
| Auth | Email + password, httpOnly session cookie, Argon2id |
| Roles | Seed matrix in `src/rbac/` — founder → guest |

## Not in this scaffold

- Live email verify (needs mail provider)
- Hosted Postgres (needs managed host)
- SSO with the marketing site (F10)

## Local next steps

```bash
cd forum/server
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

UI talks to `VITE_FORUM_API_URL` (default `http://127.0.0.1:8787`).
