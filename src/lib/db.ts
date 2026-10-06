import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

// Override with DATA_DIR in production to point at a persistent volume.
// The turbopackIgnore hints stop the build from tracing the whole project
// into the server bundle because of these runtime filesystem paths.
const DATA_DIR =
  process.env.DATA_DIR ||
  path.join(/* turbopackIgnore: true */ process.cwd(), "data");
if (!fs.existsSync(/* turbopackIgnore: true */ DATA_DIR)) {
  fs.mkdirSync(/* turbopackIgnore: true */ DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(/* turbopackIgnore: true */ DATA_DIR, "krijo.db");

declare global {
  var __krijoDb: Database.Database | undefined;
}

function createDb() {
  const db = new Database(/* turbopackIgnore: true */ DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      business TEXT,
      package TEXT,
      message TEXT NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
  `);

  // Migration: per-browser token used for rate limiting. Added after launch,
  // so existing databases need the column patched in.
  const columns = db
    .prepare("PRAGMA table_info(contacts)")
    .all() as { name: string }[];
  if (!columns.some((c) => c.name === "client_token")) {
    db.exec("ALTER TABLE contacts ADD COLUMN client_token TEXT");
  }
  db.exec(
    "CREATE INDEX IF NOT EXISTS idx_contacts_token ON contacts(client_token)"
  );

  return db;
}

export const db: Database.Database =
  global.__krijoDb ?? (global.__krijoDb = createDb());

export type ContactRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  package: string | null;
  message: string;
  ip: string | null;
  user_agent: string | null;
  client_token: string | null;
  created_at: string;
};

export function insertContact(input: {
  name: string;
  email: string;
  phone?: string | null;
  business?: string | null;
  package?: string | null;
  message: string;
  ip?: string | null;
  user_agent?: string | null;
  client_token?: string | null;
}): ContactRow {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, business, package, message, ip, user_agent, client_token)
    VALUES (@name, @email, @phone, @business, @package, @message, @ip, @user_agent, @client_token)
    RETURNING *;
  `);
  return stmt.get({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    business: input.business ?? null,
    package: input.package ?? null,
    message: input.message,
    ip: input.ip ?? null,
    user_agent: input.user_agent ?? null,
    client_token: input.client_token ?? null,
  }) as ContactRow;
}

export function listContacts(limit = 100): ContactRow[] {
  return db
    .prepare("SELECT * FROM contacts ORDER BY id DESC LIMIT ?")
    .all(limit) as ContactRow[];
}

export function countContactsSince(seconds: number, ip: string | null): number {
  if (!ip) return 0;
  const row = db
    .prepare(
      "SELECT COUNT(*) as c FROM contacts WHERE ip = ? AND created_at >= datetime('now', ?)"
    )
    .get(ip, `-${seconds} seconds`) as { c: number };
  return row.c;
}

export function countContactsSinceByToken(
  seconds: number,
  token: string | null
): number {
  if (!token) return 0;
  const row = db
    .prepare(
      "SELECT COUNT(*) as c FROM contacts WHERE client_token = ? AND created_at >= datetime('now', ?)"
    )
    .get(token, `-${seconds} seconds`) as { c: number };
  return row.c;
}
