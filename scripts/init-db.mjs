// Creates the `orders` table in your Postgres (Neon) database.
// Usage:  npm run db:init   (reads DATABASE_URL from .env.local)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Minimal .env.local loader (this standalone script doesn't go through Next.js).
try {
  const env = readFileSync(join(root, ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* no .env.local — rely on the ambient environment */
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString || connectionString.includes("REPLACE_WITH")) {
  console.error("✗ DATABASE_URL is not set (fill it in .env.local first).");
  process.exit(1);
}

const sql = readFileSync(join(root, "db", "schema.sql"), "utf8");
const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await pool.query(sql);
  console.log("✓ orders table is ready.");
} catch (e) {
  console.error("✗ DB init failed:", e.message);
  process.exit(1);
} finally {
  await pool.end();
}
