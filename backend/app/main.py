import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from . import db
from .logic import process
from .routing import DEPARTMENTS, wait_minutes

app = FastAPI(title="Harbor API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")],
    allow_methods=["*"], allow_headers=["*"],
)


class Intake(BaseModel):
    category: str
    message: str = Field(min_length=3)
    context: str = ""
    mood: int = Field(ge=1, le=4)


class OpenBody(BaseModel):
    staff: str


class ShareBody(BaseModel):
    approved: bool


@app.on_event("startup")
def startup():
    db.init()
    if os.getenv("SEED_DEMO", "true") == "true":
        from .seed import seed
        seed()


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/intake")
def intake(b: Intake):
    return db.get_case(db.insert_case(process(b.category, b.message, b.context, b.mood)))


@app.get("/api/cases")
def cases(department: str | None = None):
    return db.list_cases(department)


@app.get("/api/cases/{cid}")
def case(cid: str):
    c = db.get_case(cid)
    if not c:
        raise HTTPException(404, "Case not found")
    return c


@app.post("/api/cases/{cid}/open")
def open_case(cid: str, b: OpenBody):
    if not db.get_case(cid):
        raise HTTPException(404, "Case not found")
    db.log_view(cid, b.staff)          # "Who saw this" timeline
    return db.get_case(cid)


@app.post("/api/cases/{cid}/share")
def share(cid: str, b: ShareBody):
    db.update(cid, summary_shared=int(b.approved))
    return db.get_case(cid)


@app.post("/api/cases/{cid}/revoke")
def revoke(cid: str):
    db.update(cid, status="revoked", summary_shared=0)   # One-tap revoke
    return db.get_case(cid)


@app.get("/api/capacity")
def capacity():
    out = []
    for d in DEPARTMENTS.values():
        w = db.waiting_count(d["name"])
        out.append({"department": d["name"], "waiting": w, "wait_minutes": wait_minutes(d["name"], w, "medium")})
    return out
