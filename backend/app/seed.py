"""Pre-loaded demo cases so the staff view isn't empty."""
from . import db
from .logic import process

DEMO = [
    ("academic", "I'm failing two classes and have a deadline Friday", "", 3),
    ("financial", "I can't pay rent this month and my aid hasn't arrived", "Waiting three weeks", 3),
    ("wellbeing", "I've been anxious, haven't slept, and feel overwhelmed", "", 4),
    ("housing", "My roommate situation is stressful", "", 2),
    ("health", "Been sick for a week, need a note for my professor", "", 1),
]


def seed():
    if db.list_cases():
        return
    for cat, msg, ctx, mood in DEMO:
        db.insert_case(process(cat, msg, ctx, mood))
