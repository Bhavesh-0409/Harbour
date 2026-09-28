"""'Why this route' text. Score is rule-based; Gemini only phrases it."""
import os
import httpx

LABEL = {"low": "low", "medium": "moderate", "high": "high", "crisis": "immediate"}


def template_reason(category, urgency, department, signals):
    s = f" We noticed {', '.join(signals[:3])} in what you wrote." if signals else ""
    base = f"You chose {category}, and your message reads as {LABEL[urgency]} priority.{s}"
    if urgency == "crisis":
        return base + " Because of that, we skipped the queue and put you in touch with people who can help right now."
    return base + f" {department} handles this kind of request, so we sent you there directly."


def build_reason(category, urgency, department, signals):
    fallback = template_reason(category, urgency, department, signals)
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        return fallback
    prompt = (
        "Write 2 warm, plain-language sentences (no medical claims) telling a stressed student why they were "
        f"routed to '{department}'. Category: {category}. Urgency: {urgency}. Signals: {signals}. Address them as 'you'."
    )
    try:
        r = httpx.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            params={"key": key}, timeout=6,
            json={"contents": [{"parts": [{"text": prompt}]}]},
        )
        r.raise_for_status()
        return r.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception:
        return fallback


def build_summary(category, message):
    m = " ".join(message.split())
    return f"Student reports a {category} concern: {m[:160]}{'…' if len(m) > 160 else ''}"
