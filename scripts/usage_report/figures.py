"""
figures.py — every number the usage report prints, computed from pull.py's dict.

Pure: no network, no clock. `compute(data)` returns a dict whose scalar values
(`scalars`) are also embedded in the published page, so the next run can say
what changed since this one (run.py --previous).
"""
from __future__ import annotations

import collections
import datetime as dt
from urllib.parse import unquote_plus

# ── small helpers ──────────────────────────────────────────────────────────────


def i(x) -> int:
    return int(float(x))


def pct(a: float, b: float) -> int:
    return round(100 * a / b) if b else 0


def hours(seconds: float) -> float:
    return round(seconds / 3600, 1)


def day(s: str) -> dt.date:
    return dt.date.fromisoformat(s[:4] + "-" + s[4:6] + "-" + s[6:]) if "-" not in s else dt.date.fromisoformat(s)


def topic_name(path_qs: str) -> str | None:
    """`/?topic=Exam%20MAS-I&mode=quiz` → `MAS-I`; the quiz builder's exam names."""
    if not path_qs.startswith("/?topic="):
        return None
    raw = unquote_plus(path_qs[len("/?topic="):].split("&")[0])
    return {"Probability": "P", "Financial Mathematics": "FM"}.get(raw, raw.removeprefix("Exam ").strip())


def exam_page_name(path: str) -> str:
    """`/wiki/exam/Exam+MAS-I+(CAS)` → `MAS-I`."""
    name = unquote_plus(path.removeprefix("/wiki/exam/"))
    name = name.removeprefix("Exam ")
    for body in (" (CAS)", " (SOA)", " (CIA)"):
        name = name.removesuffix(body)
    return name


# ── the computation ────────────────────────────────────────────────────────────

FUNNEL_GROUPS = [  # (label, GA4 channel groups) for the channel table
    ("Direct", ["Direct"]),
    ("Google & other search", ["Organic Search"]),
    ("LinkedIn & other social", ["Organic Social"]),
    ("AI assistants (ChatGPT)", ["AI Assistant"]),
]


def compute(data: dict) -> dict:
    g, db = data["ga"], data["db"]
    F: dict = {"start": data["start"], "end": data["end"]}
    S: dict = {}  # scalars, diffed between runs

    ev = {r[0]: (i(r[1]), i(r[2])) for r in g["events"]}
    users = lambda name: ev.get(name, (0, 0))[0]  # noqa: E731
    t = g["totals"][0] if g["totals"] else ["0"] * 6
    S["visitors"], S["sessions"], S["engaged_sessions"] = i(t[0]), i(t[2]), i(t[3])
    total_eng_s = i(t[4])
    for k in ["user_engagement", "first_visit", "first_quiz", "question_answered", "first_correct",
              "quiz_completed", "day2_return", "sign_up", "exception", "search", "concept_collected",
              "streak_extended", "quest_completed", "flashcard_reviewed", "craft_combined",
              "battle_started", "project_started", "store_outbound_clicked", "tutor_offer"]:
        S[k] = users(k)
    S["engaged"] = S.pop("user_engagement")
    S["answer_events"] = ev.get("question_answered", (0, 0))[1]
    S["craft_combinations"] = ev.get("craft_combined", (0, 0))[1]
    S["quiz_drop_pct"] = 100 - pct(S["question_answered"], S["first_quiz"])
    S["ga_users_all"] = sum(i(r[1]) for r in g["hosts"])
    S["e2e_users"] = sum(i(r[1]) for r in g["hosts"] if r[0] == g["e2e_host"])
    S["engaged_share_of_ga_pct"] = round(100 * S["engaged"] / S["ga_users_all"], 1) if S["ga_users_all"] else 0
    S["next_visit_pct"] = pct(S["day2_return"], S["first_visit"])

    # daily / weekly
    F["daily"] = [(day(r[0]).isoformat(), i(r[1])) for r in g["daily"]]
    eng_daily = {day(r[0]).isoformat(): i(r[1]) for r in g["daily_engaged"]}
    F["daily_engaged"] = eng_daily
    weeks = [(r[0], i(r[1])) for r in g["weekly_engaged"]]
    F["weekly_engaged"] = weeks
    if weeks:
        S["engaged_this_week"] = weeks[-1][1]
        S["engaged_last_week"] = weeks[-2][1] if len(weeks) > 1 else 0
        S["engaged_peak_week"] = max(w[1] for w in weeks)
        F["peak_week"] = max(weeks, key=lambda w: w[1])[0]

    # funnel by device and channel
    def by(rows):
        d = collections.defaultdict(dict)
        for a, e, n in rows:
            d[a][e] = i(n)
        return d
    dev, ch = by(g["ev_device"]), by(g["ev_channel"])
    F["device_funnel"] = {k: (v.get("first_quiz", 0), v.get("question_answered", 0)) for k, v in dev.items()}
    dev_users = {r[0]: (i(r[1]), i(r[2])) for r in g["device"]}
    mob = dev_users.get("mobile", (0, 0))
    S["mobile_share_pct"] = pct(mob[0], sum(v[0] for v in dev_users.values()))
    S["mobile_time_pct"] = pct(mob[1], total_eng_s)
    for name in ("mobile", "desktop"):
        q, a = F["device_funnel"].get(name, (0, 0))
        S[f"{name}_quiz_drop_pct"] = 100 - pct(a, q)

    time_by_group = collections.Counter()
    source_users = collections.Counter()
    for grp, src, u, _sessions, _engaged, secs in g["channel"]:
        time_by_group[grp] += i(secs)
        source_users[src] += i(u)
    rows, used = [], set()
    for label, groups in FUNNEL_GROUPS:
        agg = collections.Counter()
        for grp in groups:
            used.add(grp)
            agg.update(ch.get(grp, {}))
        rows.append((label, agg, sum(time_by_group[x] for x in groups)))
    other = collections.Counter()
    for grp, v in ch.items():
        if grp not in used:
            other.update(v)
    rows.append(("Everything else", other, sum(v for k, v in time_by_group.items() if k not in used)))
    F["channels"] = [
        {"label": lab, "new": c.get("first_visit", 0), "engaged": c.get("user_engagement", 0),
         "quiz": c.get("first_quiz", 0), "answered": c.get("question_answered", 0),
         "returned": c.get("day2_return", 0), "hours": hours(secs)}
        for lab, c, secs in rows
    ]
    S["linkedin_visitors"] = source_users["linkedin.com"] + source_users["lnkd.in"]
    S["chatgpt_visitors"] = source_users["chatgpt.com"]
    S["chatgpt_engaged"] = ch.get("AI Assistant", {}).get("user_engagement", 0)
    srch = ch.get("Organic Search", {})
    S["search_new"], S["search_engaged"] = srch.get("first_visit", 0), srch.get("user_engagement", 0)
    S["search_quiz"] = srch.get("first_quiz", 0)
    li = [(day(r[0]).isoformat(), i(r[1])) for r in g["linkedin_daily"]]
    F["linkedin_top_days"] = sorted(li, key=lambda x: -x[1])[:3]

    # who and where
    nr = {r[0]: (i(r[1]), i(r[2])) for r in g["newret"]}
    ret = nr.get("returning", (0, 0))
    S["returning_share_pct"] = pct(ret[0], S["visitors"])
    S["returning_time_pct"] = pct(ret[1], total_eng_s)
    F["countries"] = [(r[0], i(r[1]), i(r[2])) for r in g["country"][:6]]
    top5 = sum(i(r[2]) for r in g["top_devices"][:5])
    S["top5_device_time_pct"] = pct(top5, total_eng_s)
    S["engaged_hours"] = hours(total_eng_s)

    # what people study
    topics = collections.Counter()
    for path, u in g["topics"]:
        name = topic_name(path)
        if name:
            topics[name] += i(u)
    F["topics"] = topics.most_common(12)
    exams = collections.defaultdict(lambda: [0, 0])
    for path, u, secs in g["exam_pages"]:
        e = exams[exam_page_name(path)]
        e[0] += i(u)
        e[1] += i(secs)
    F["exam_pages"] = sorted(((k, v[0], hours(v[1])) for k, v in exams.items()), key=lambda x: -x[1])[:12]
    fq = [(r[0], i(r[1])) for r in g["first_quiz_pages"]]
    S["first_quiz_from_builder"] = sum(n for p, n in fq if p == "/")
    S["first_quiz_from_question_pages"] = sum(n for p, n in fq if p.startswith("/wiki/question/"))
    ql = g["question_landings"]
    S["question_landing_sessions"] = sum(i(r[1]) for r in ql)
    S["question_landing_engaged"] = sum(i(r[2]) for r in ql)
    S["question_landing_google"] = sum(i(r[1]) for r in ql if r[0] == "google")

    # errors
    F["exception_pages"] = [(r[0], i(r[1]), i(r[2])) for r in g["exceptions_page"][:5]]
    exb = {(r[0], r[1]): i(r[2]) for r in g["exceptions_browser"]}
    allb = {(r[0], r[1]): i(r[2]) for r in g["browser_users"]}
    F["exception_browsers"] = sorted(((f"{b} on {o}", n, allb.get((b, o), 0)) for (b, o), n in exb.items()),
                                     key=lambda x: -x[1])[:6]
    S["exception_pct"] = pct(S["exception"], S["engaged"])

    # cohort: first-visit day × days later
    size, back = {}, collections.defaultdict(dict)
    for c, n, a in g["cohort"]:
        if n == "0000":
            size[c] = i(a)
        elif i(a):
            back[c][i(n)] = i(a)
    F["cohort_size"], F["cohort_back"] = size, {k: dict(v) for k, v in back.items()}
    D = collections.Counter()
    for c in back.values():
        D.update(c)
    S["cohort_new"] = sum(size.values())
    for k in (1, 2, 3, 4):
        S[f"cohort_d{k}"] = D[k]
    S["cohort_d8plus"] = sum(v for k, v in D.items() if k >= 8)
    S["next_day_pct"] = round(100 * D[1] / S["cohort_new"], 1) if S["cohort_new"] else 0

    # machines and the team
    internal = g["internal"][0] if g["internal"] else ["0", "0"]
    S["internal_ids"] = i(internal[0])
    prod_eng = i(g["prod_engagement"][0][0]) if g["prod_engagement"] else 0
    S["internal_time_pct"] = pct(i(internal[1]), prod_eng)
    S["crawler_singapore"] = i(g["crawler_singapore"][0][0]) if g["crawler_singapore"] else 0
    S["crawler_linux"] = i(g["crawler_linux"][0][0]) if g["crawler_linux"] else 0
    F["chatgpt_days"] = sorted({day(r[0]).isoformat() for r in g["chatgpt"]})

    F.update(accounts(db, data["start"], data["end"], S))
    F["scalars"] = S
    return F


# ── accounts (Supabase) ────────────────────────────────────────────────────────


def accounts(db: dict, start: str, end: str, S: dict) -> dict:
    meta = {a["uid"]: a for a in db["accounts"]}
    by = collections.defaultdict(lambda: collections.defaultdict(dict))
    for r in db["activity"]:
        by[r["uid"]][r["d"]][r["k"]] = r
    visit = lambda kinds: any(k != "sub" for k in kinds)  # noqa: E731  (a Stripe renewal isn't a visit)
    rows = []
    for uid, days in by.items():
        if uid not in meta:
            continue
        active = sorted(d for d, k in days.items() if d >= start and visit(k))
        if not active:
            continue  # nothing in the window: an old, idle account
        created = meta[uid]["created"]
        returns = [d for d in active if d > created]
        answers = sum(int(k["ans"]["n"]) for d, k in days.items() if "ans" in k and d >= start)
        correct = sum(int(k["ans"]["s"] or 0) for d, k in days.items() if "ans" in k and d >= start)
        exams = [x for k in days.values() if "exam" in k for x in (k["exam"]["xs"] or "").split("; ")]
        deck = sum(int(k["deck"]["n"]) for k in days.values() if "deck" in k)
        rows.append({
            "uid": uid, "masked": meta[uid]["masked"], "created": created,
            "confirmed": meta[uid]["confirmed"], "days": {d: days[d] for d in sorted(days) if d >= start},
            "returns": returns, "practised_returns": [d for d in returns if "ans" in days[d]],
            "answers": answers, "correct": correct, "exam_date": any(":" in x for x in exams),
            "deck": deck, "key": any("key" in k for k in days.values()),
            "beta": any("beta" in k for k in days.values()),
        })
    rows.sort(key=lambda r: (-r["answers"], -len(r["returns"]), r["created"]))
    created_in = [r for r in rows if r["created"] >= start]
    subs = db["subscriptions"]
    paying = [s for s in subs if s["tier"] == "premium" and s["status"] == "active" and s["stripe"]]
    A = {
        "accounts_shown": len(rows),
        "accounts_created": len(created_in),
        "accounts_practised": sum(1 for r in created_in if r["answers"]),
        "accounts_exam_date": sum(1 for r in created_in if r["exam_date"]),
        "accounts_big_deck_no_answers": sum(1 for r in created_in if r["deck"] >= 60 and not r["answers"]),
        "accounts_unconfirmed": sum(1 for r in created_in if not r["confirmed"]),
        "accounts_returned": sum(1 for r in rows if r["returns"]),
        "accounts_practised_on_return": sum(1 for r in rows if r["practised_returns"]),
        "accounts_never_back": sum(1 for r in rows if not r["returns"] and r["created"] < end),
        "accounts_pro_key": sum(1 for r in rows if r["key"]),
        "accounts_beta": sum(1 for r in rows if r["beta"]),
        "paying_subscribers": len(paying),
        "paying_without_answers": sum(1 for s in paying if not next((r["answers"] for r in rows if r["uid"] == s["uid"]), 0)),
        "db_answers": sum(r["answers"] for r in rows),
        "pro_keys_total": int(db["pro_keys"]["total"]),
        "pro_keys_readers": int(db["pro_keys"]["by_readers"]),
        "content_reports": int(db["content_reports"]),
        "email_optins": sum(1 for e in db["email_optins"] if e["daily_plan_email"]),
        "email_optins_never_sent": sum(1 for e in db["email_optins"] if e["daily_plan_email"] and not e["last_sent"]),
        "team_accounts": int(db["team_accounts"]),
        "all_accounts": int(db["all_accounts"]),
    }
    S.update(A)
    S["guest_answer_share_min_pct"] = max(0, 100 - pct(A["db_answers"], S["answer_events"])) if S.get("answer_events") else 0
    return {"account_rows": rows, "paying": paying}
