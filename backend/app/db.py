"""SQLite for now. Swap these functions for Supabase later; the API layer won't change."""
import os, sqlite3, json, uuid
from datetime import datetime, timezone


def conn():
    c = sqlite3.connect(os.getenv("DB_PATH", "harbor.db"))
    c.row_factory = sqlite3.Row
    return c


def now():
    return datetime.now(timezone.utc).isoformat()


def init():
    with conn() as c:
        c.executescript("""
        CREATE TABLE IF NOT EXISTS cases(
          id TEXT PRIMARY KEY, created_at TEXT, alias TEXT, category TEXT, message TEXT, context TEXT,
          mood INTEGER, score INTEGER, urgency TEXT, department TEXT, reason TEXT, summary TEXT,
          signals TEXT, status TEXT DEFAULT 'waiting', summary_shared INTEGER DEFAULT 0, wait_minutes INTEGER);
        CREATE TABLE IF NOT EXISTS views(
          id INTEGER PRIMARY KEY AUTOINCREMENT, case_id TEXT, staff TEXT, opened_at TEXT);
        """)


def insert_case(d: dict):
    d = {**d, "id": uuid.uuid4().hex[:10], "created_at": now(), "signals": json.dumps(d["signals"])}
    with conn() as c:
        c.execute(f"INSERT INTO cases({','.join(d)}) VALUES({','.join('?' * len(d))})", list(d.values()))
    return d["id"]


def waiting_count(department: str) -> int:
    with conn() as c:
        return c.execute("SELECT COUNT(*) FROM cases WHERE department=? AND status='waiting'", (department,)).fetchone()[0]


def _hydrate(c, row):
    d = dict(row)
    d["signals"] = json.loads(d["signals"] or "[]")
    d["views"] = [dict(v) for v in c.execute("SELECT staff, opened_at FROM views WHERE case_id=? ORDER BY id", (d["id"],))]
    return d


def get_case(cid):
    with conn() as c:
        r = c.execute("SELECT * FROM cases WHERE id=?", (cid,)).fetchone()
        return _hydrate(c, r) if r else None


def list_cases(department=None):
    q = "SELECT * FROM cases WHERE status!='revoked'" + (" AND department=?" if department else "")
    q += " ORDER BY score DESC, created_at ASC"
    with conn() as c:
        return [_hydrate(c, r) for r in c.execute(q, (department,) if department else ())]


def update(cid, **f):
    with conn() as c:
        c.execute(f"UPDATE cases SET {','.join(f'{k}=?' for k in f)} WHERE id=?", [*f.values(), cid])


def log_view(cid, staff):
    with conn() as c:
        c.execute("INSERT INTO views(case_id, staff, opened_at) VALUES(?,?,?)", (cid, staff, now()))
