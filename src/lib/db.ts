import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "krijo.db");

declare global {
  var __krijoDb: Database.Database | undefined;
}

function createDb() {
  const db = new Database(DB_PATH);
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
}): ContactRow {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, business, package, message, ip, user_agent)
    VALUES (@name, @email, @phone, @business, @package, @message, @ip, @user_agent)
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
