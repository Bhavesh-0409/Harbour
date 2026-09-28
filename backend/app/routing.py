"""Maps category + urgency to a team, and estimates wait times."""

DEPARTMENTS = {
    "wellbeing": {"name": "Counseling & Wellbeing", "base": 45, "per_case": 8},
    "academic":  {"name": "Academic Advising", "base": 30, "per_case": 5},
    "financial": {"name": "Financial Aid", "base": 40, "per_case": 6},
    "housing":   {"name": "Housing Services", "base": 35, "per_case": 6},
    "health":    {"name": "Health Services", "base": 25, "per_case": 7},
    "other":     {"name": "Student Support Desk", "base": 15, "per_case": 3},
}
CRISIS_TEAM = "Crisis Response Team"


def route(category: str, urgency: str) -> str:
    if urgency == "crisis":
        return CRISIS_TEAM
    return DEPARTMENTS.get(category, DEPARTMENTS["other"])["name"]


def wait_minutes(dept_name: str, waiting: int, urgency: str) -> int:
    if urgency == "crisis":
        return 0
    d = next((v for v in DEPARTMENTS.values() if v["name"] == dept_name), DEPARTMENTS["other"])
    est = d["base"] + waiting * d["per_case"]
    return max(5, est // 3) if urgency == "high" else est   # high priority moves up the queue
