import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { CATEGORY_SEED } from "./data/categorySeed.js";
import { can, type AuthContext } from "./rbac/authorize.js";

const app = new Hono();
const origin = process.env.APP_ORIGIN ?? "http://127.0.0.1:5174";
const port = Number(process.env.PORT ?? 8787);

app.use(
  "*",
  cors({
    origin,
    credentials: true,
  }),
);

app.get("/health", (c) => c.json({ ok: true, stage: "F2-scaffold" }));

/** Public category tree (static seed until Prisma migrate is applied). */
app.get("/api/categories", (c) => c.json({ categories: CATEGORY_SEED }));

/**
 * Placeholder session probe — returns guest until auth routes land.
 * Real register/login/session hash in the next F2 commit after DB is available.
 */
app.get("/api/me", (c) => {
  const ctx: AuthContext = { userId: null, roles: [] };
  return c.json({
    user: null,
    permissions: [...(can(ctx, "section.read") ? ["section.read"] : [])],
  });
});

app.notFound((c) => c.json({ error: "not_found" }, 404));

app.onError((err, c) => {
  const status = (err as Error & { status?: number }).status ?? 500;
  return c.json({ error: err.message || "server_error" }, status as 500);
});

serve({ fetch: app.fetch, port }, () => {
  console.log(`forum-api listening on :${port}`);
});
