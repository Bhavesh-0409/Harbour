from .scoring import score_case
from .routing import route, wait_minutes
from .reasoning import build_reason, build_summary
from . import db
import os


def process(category: str, message: str, context: str, mood: int) -> dict:
    s = score_case(message, context, mood)
    dept = route(category, s["urgency"])
    return {
        "alias": f"Student {os.urandom(2).hex().upper()}",
        "category": category, "message": message, "context": context, "mood": mood,
        "score": s["score"], "urgency": s["urgency"], "signals": s["signals"],
        "department": dept, "wait_minutes": wait_minutes(dept, db.waiting_count(dept), s["urgency"]),
        "reason": build_reason(category, s["urgency"], dept, s["signals"]),
        "summary": build_summary(category, message),
    }
