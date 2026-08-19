import { Pool } from "pg";

// A single shared connection Pool, reused across hot-reloads in dev so we don't
// exhaust Neon's connection limit. Cloud Postgres (Neon) requires SSL.
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool;

// Thin query helper. Returns node-postgres rows.
export function query(text: string, params?: unknown[]) {
  return pool.query(text, params as never[]);
}
