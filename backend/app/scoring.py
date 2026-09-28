"""Rule-based urgency scoring. Fast, explainable, no black box."""

CRISIS = ["suicide", "suicidal", "kill myself", "end my life", "want to die", "self harm",
          "self-harm", "hurt myself", "hurting myself", "abused", "abuse", "not safe",
          "unsafe", "assault", "overdose"]
HIGH = ["panic", "can't breathe", "cant breathe", "hopeless", "no food", "homeless", "evicted",
        "eviction", "expelled", "can't cope", "cannot cope", "haven't slept", "harass", "threat"]
MEDIUM = ["anxious", "anxiety", "stress", "overwhelm", "failing", "deadline", "behind",
          "can't pay", "cant pay", "lonely", "depress", "burnout", "burned out", "rent", "sick"]


def score_case(message: str, context: str, mood: int) -> dict:
    text = f"{message} {context}".lower()
    crisis = [k for k in CRISIS if k in text]
    high = [k for k in HIGH if k in text]
    med = [k for k in MEDIUM if k in text]

    if crisis:
        score = 100
    else:
        score = min(60, 25 * len(high)) + min(30, 8 * len(med)) + {1: 0, 2: 8, 3: 18, 4: 30}.get(mood, 0)
        score = min(score, 89)

    level = "crisis" if score >= 90 else "high" if score >= 55 else "medium" if score >= 30 else "low"
    return {"score": score, "urgency": level, "signals": crisis + high + med}
