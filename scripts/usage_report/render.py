"""
render.py — the usage report as one self-contained HTML page, from figures.py.

Every sentence that states a number or a comparison is built here from the
figures, so a daily run never leaves a stale claim behind. Judgement — what the
numbers mean this week, what to do about it — lives in an optional notes file
(run.py --notes), written fresh by whoever prepares the report.

The page embeds its own scalars as JSON (`#usage-figures`) so the next run can
diff against it without anything persisting between sessions.
"""
from __future__ import annotations

import datetime as dt
import html
import json
from pathlib import Path

CSS = (Path(__file__).resolve().parent / "report.css").read_text()


def esc(s) -> str:
    return html.escape(str(s))


def fmt_day(d: str, weekday=True) -> str:
    x = dt.date.fromisoformat(d)
    return x.strftime("%a %b %-d") if weekday else x.strftime("%b %-d")


def n(x) -> str:
    return f"{x:,}" if isinstance(x, int) else str(x)


def plural(k: int, one: str, many: str | None = None) -> str:
    return f"{n(k)} {one if k == 1 else (many or one + 's')}"


# ── charts ─────────────────────────────────────────────────────────────────────


def daily_chart(F: dict) -> str:
    start, end = dt.date.fromisoformat(F["start"]), dt.date.fromisoformat(F["end"])
    days = [start + dt.timedelta(k) for k in range((end - start).days + 1)]
    vis = dict(F["daily"])
    eng = F["daily_engaged"]
    peak = max([vis.get(d.isoformat(), 0) for d in days] + [1])
    step = 25 if peak <= 150 else 50
    mx = ((peak // step) + 1) * step
    W, H, L, B, T = 760, 300, 40, 44, 20
    pw, ph = W - L - 10, H - B - T
    bw = pw / len(days)
    s = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Daily visitors and engaged people" class="chart">']
    for v in range(0, mx + 1, step):
        y = T + ph - ph * v / mx
        s.append(f'<line x1="{L}" x2="{W-10}" y1="{y:.1f}" y2="{y:.1f}" class="grid"/>'
                 f'<text x="{L-6}" y="{y+4:.1f}" class="tick" text-anchor="end">{v}</text>')
    for k, d in enumerate(days):
        a, b = vis.get(d.isoformat(), 0), eng.get(d.isoformat(), 0)
        x, w = L + k * bw + bw * 0.12, bw * 0.76
        ya, yb = T + ph - ph * a / mx, T + ph - ph * b / mx
        tip = f"<title>{fmt_day(d.isoformat())}: {a} visitors, {b} engaged</title>"
        s.append(f'<rect x="{x:.2f}" y="{ya:.1f}" width="{w:.2f}" height="{T+ph-ya:.1f}" class="bar-a">{tip}</rect>')
        s.append(f'<rect x="{x:.2f}" y="{yb:.1f}" width="{w:.2f}" height="{T+ph-yb:.1f}" class="bar-b">{tip}</rect>')
        if d.day in (1, 15):
            s.append(f'<text x="{x+w/2:.1f}" y="{H-B+20}" class="tick" text-anchor="middle">{d.strftime("%b %-d")}</text>')
        if a >= mx * 0.45:
            s.append(f'<text x="{x+w/2:.1f}" y="{ya-5:.1f}" class="val" text-anchor="middle" style="font-size:11px">{a}</text>')
    s.append("</svg>")
    return "".join(s)


def funnel_chart(S: dict) -> str:
    base = S["engaged"] or 1
    steps = [("Engaged on the app", S["engaged"], ""),
             ("Opened a quiz", S["first_quiz"], f"{round(100*S['first_quiz']/base)}%"),
             ("Answered a question", S["question_answered"], f"{100-S['quiz_drop_pct']}% of quiz openers"),
             ("Finished a quiz", S["quiz_completed"], f"{round(100*S['quiz_completed']/max(S['first_quiz'],1))}% of quiz openers"),
             ("Came back another day", S["day2_return"], f"{round(100*S['day2_return']/base)}%"),
             ("Signed up (GA event)", S["sign_up"], f"{round(100*S['sign_up']/base)}%")]
    W, rh, L = 720, 38, 200
    pw = W - L - 140
    s = [f'<svg viewBox="0 0 {W} {len(steps)*rh+8}" role="img" aria-label="Activation funnel" class="chart">']
    for k, (lab, v, p) in enumerate(steps):
        y, w = 4 + k * rh, max(3, pw * v / base)
        s.append(f'<text x="{L-12}" y="{y+22}" class="lab" text-anchor="end">{lab}</text>'
                 f'<rect x="{L}" y="{y+6}" width="{w:.1f}" height="24" rx="2" class="{"bar-b" if k < 4 else "bar-c"}"/>'
                 f'<text x="{L+w+8:.1f}" y="{y+23}" class="val">{v}<tspan class="tick" dx="8">{p}</tspan></text>')
    s.append("</svg>")
    return "".join(s)


# ── tables ─────────────────────────────────────────────────────────────────────


ACTIVITY_PANELS = [
    ("pages", "Pages read", "page views and concept or PDF reads in the popup (GA4)"),
    ("answered", "Questions answered", "every reader GA4 sees, guests included"),
    ("saved", "Answers saved to accounts", "Supabase, including readers GA4 can't see"),
    ("quizzes", "Quizzes finished", "GA4 <code>quiz_completed</code>"),
]


def compact(v: int) -> str:
    """An axis label that fits a narrow gutter: 1500 -> 1.5k."""
    return f"{v/1000:g}k" if v >= 1000 else str(v)


def nice_max(v: int) -> int:
    """A round axis top at or above v: 1, 2 or 5 times a power of ten."""
    if v <= 0:
        return 1
    m = 10 ** (len(str(int(v))) - 1)
    for k in (1, 2, 5, 10):
        if v <= k * m:
            return k * m
    return 10 * m


def activity_panel(weeks: list[dict], key: str, title: str, partial: bool) -> str:
    """One small multiple: a week-by-week bar chart of one measure, on its own axis."""
    vals = [w[key] for w in weeks]
    mx = nice_max(max(vals + [1]))
    W, H, L, R, T, B = 360, 150, 34, 6, 10, 24
    pw, ph = W - L - R, H - T - B
    bw = pw / max(len(weeks), 1)
    s = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="{esc(title)} per week" class="chart">']
    for v in (0, mx // 2, mx):
        y = T + ph - ph * v / mx
        s.append(f'<line x1="{L}" x2="{W-R}" y1="{y:.1f}" y2="{y:.1f}" class="grid"/>'
                 f'<text x="{L-5}" y="{y+4:.1f}" class="tick" text-anchor="end">{compact(v)}</text>')
    last = len(weeks) - 1
    for k, w in enumerate(weeks):
        v = w[key]
        x, bwid = L + k * bw + bw * 0.14, bw * 0.72
        h = ph * v / mx
        y = T + ph - h
        cls = "bar-a" if (partial and k == last) else "bar-b"
        so_far = " so far" if (partial and k == last) else ""
        r = min(4, bwid / 2, h)
        # 4px rounded data end, square at the baseline
        path = (f"M{x:.2f},{T+ph:.1f} V{y+r:.1f} Q{x:.2f},{y:.1f} {x+r:.2f},{y:.1f} H{x+bwid-r:.2f} "
                f"Q{x+bwid:.2f},{y:.1f} {x+bwid:.2f},{y+r:.1f} V{T+ph:.1f} Z") if h > 0 else ""
        tip = f"<title>Week of {fmt_day(w['monday'], False)}: {n(v)}{so_far}</title>"
        # a hit target the full height of the plot, so short bars are easy to hover
        s.append(f'<g class="hit"><rect x="{L + k*bw:.2f}" y="{T}" width="{bw:.2f}" height="{ph}" fill="transparent"/>'
                 + (f'<path d="{path}" class="{cls}"/>' if path else "") + f"{tip}</g>")
        if k == last:  # the newest week, anchored to its bar's right edge so it isn't clipped
            s.append(f'<text x="{x+bwid:.1f}" y="{H-6}" class="tick" text-anchor="end">{fmt_day(w["monday"], False)}</text>')
        elif k % 4 == 0 and last - k >= 3:
            s.append(f'<text x="{x+bwid/2:.1f}" y="{H-6}" class="tick" text-anchor="middle">{fmt_day(w["monday"], False)}</text>')
    s.append("</svg>")
    return "".join(s)


def activity_chart(F: dict, partial: bool) -> str:
    weeks = F.get("weekly_activity", [])
    if not weeks:
        return ""
    cells = []
    for key, title, sub in ACTIVITY_PANELS:
        total = sum(w[key] for w in weeks)
        cells.append(f'<div class="mult"><div class="mult-head"><span>{esc(title)}</span><b>{n(total)}</b></div>'
                     f'<div class="mult-sub">{sub}</div>{activity_panel(weeks, key, title, partial)}</div>')
    rows = "".join(f"<tr><td>{fmt_day(w['monday'], False)}</td>" + "".join(f'<td class="n">{n(w[k])}</td>' for k, _, _ in ACTIVITY_PANELS) + "</tr>"
                   for w in weeks)
    head = "".join(f'<th class="n">{esc(t)}</th>' for _, t, _ in ACTIVITY_PANELS)
    data_table = (f'<details class="small"><summary>Show the numbers</summary><div class="tbl"><table>'
                  f'<thead><tr><th>Week of</th>{head}</tr></thead><tbody>{rows}</tbody></table></div></details>')
    return f'<div class="multiples">{"".join(cells)}</div>{data_table}'


def table(head: list[str], rows: list[list], numeric_from=1, cls="") -> str:
    th = "".join(f'<th class="n">{esc(h)}</th>' if k >= numeric_from else f"<th>{esc(h)}</th>" for k, h in enumerate(head))
    body = "".join("<tr>" + "".join(
        f'<td class="n">{c}</td>' if k >= numeric_from else f"<td>{c}</td>" for k, c in enumerate(r)) + "</tr>" for r in rows)
    return f'<div class="tbl"><table class="{cls}"><thead><tr>{th}</tr></thead><tbody>{body}</tbody></table></div>'


def cohort_table(F: dict, N=14) -> str:
    size, back = F["cohort_size"], F["cohort_back"]
    head = "<tr><th>First visit</th><th class=\"n\">New</th>" + "".join(f'<th class="n">D{k}</th>' for k in range(1, N + 1)) + '<th class="n">D15+</th></tr>'
    body, tot = [], [0] * (N + 2)
    for c in sorted(size):
        rr = {int(k): v for k, v in back.get(c, {}).items()}
        tot[0] += size[c]
        cells = ""
        for k in range(1, N + 1):
            v = rr.get(k, 0)
            tot[k] += v
            cells += f'<td class="n c{min(v, 3)}">{v or ""}</td>'
        later = sum(v for k, v in rr.items() if k > N)
        tot[N + 1] += later
        cls = ' class="hasret"' if rr else ""
        body.append(f'<tr{cls}><td class="day">{fmt_day(c)}</td><td class="n">{size[c]}</td>{cells}<td class="n c{min(later,3)}">{later or ""}</td></tr>')
    foot = '<tr><td>All days</td>' + "".join(f'<td class="n">{v or ""}</td>' for v in tot) + "</tr>"
    return f'<div class="tbl scroll"><table class="ret"><thead>{head}</thead><tbody>{"".join(body)}</tbody><tfoot>{foot}</tfoot></table></div>'


def describe_day(k: dict) -> str:
    out = []
    if "signup" in k:
        out.append("<b>Signed up</b>")
    if "ans" in k:
        a, s = int(k["ans"]["n"]), int(k["ans"]["s"] or 0)
        out.append(f"Answered <b>{a}</b> question{'s' if a != 1 else ''}, {s} right ({round(100*s/a)}%)")
    if "quiz" in k:
        qs = []
        for x in sorted((k["quiz"]["xs"] or "").split("; ")):
            if x.count("|") == 2:
                mode, topic, sc = x.split("|")
                qs.append(("Practice exam" if mode == "mock-exam" else "Quiz") + f" on {esc(topic)} ({sc})")
        out.append(f"Finished {plural(int(k['quiz']['n']), 'quiz', 'quizzes')}: " + "; ".join(qs))
    if "card" in k:
        out.append(f"Collected {plural(int(k['card']['n']), 'flashcard')}")
    if "deck" in k and int(k["deck"]["n"]) != int(k.get("card", {}).get("n", -1)):
        out.append(f"Added {k['deck']['n']} cards to the flashcard deck")
    if "lvl" in k:
        out.append(f"{plural(int(k['lvl']['n']), 'concept')} moved up the mastery ladder")
    if "exam" in k:
        ex = (k["exam"]["xs"] or "").split("; ")
        dated = [e for e in ex if ":" in e]
        s = "Exam list saved: " + ", ".join(e.split(":")[0] for e in ex)
        if dated:
            s += "; exam date " + ", ".join(f"{e.split(':')[0]} on {fmt_day(e.split(':')[1])}" for e in dated)
        out.append(s)
    if "email" in k:
        out.append("Changed the daily study-plan email setting")
    if "key" in k:
        out.append("Redeemed a Pro access key")
    if "beta" in k:
        out.append("Redeemed a beta code")
    if "sub" in k and not any(x in k for x in ("key", "beta")):
        out.append("Subscription record updated (" + esc(k["sub"]["xs"]) + ")" + (", no visit" if len(k) == 1 else ""))
    if not out:
        out.append('<span class="muted">App open while signed in; nothing saved</span>')
    return "<br>".join(out)


# ── account journeys ───────────────────────────────────────────────────────────

def _plain(html_text: str) -> str:
    """describe_day's HTML as plain text for an SVG <title> tooltip."""
    import re
    return html.unescape(re.sub(r"<[^>]+>", "", html_text.replace("<br>", " · ")))


def _answered(k: dict) -> int:
    return int(k["ans"]["n"]) if "ans" in k else 0


def journey_rows(F: dict) -> list[dict]:
    """Accounts that did something after signing up, most answers first."""
    rows = []
    for r in F["account_rows"]:
        days = {d: k for d, k in r["days"].items() if any(x != "sub" for x in k) or d == r["created"]}
        if not days:
            continue
        r = dict(r, active=sorted(days), last=max(days))
        rows.append(r)
    rows.sort(key=lambda r: (-r["answers"], -len(r["active"]), r["created"]))
    return rows


def swimlanes(rows: list[dict], end: str) -> str:
    """One strip per account: a ring on its sign-up day, a dot per day it practised
    (area by questions answered), a small mark per day it only opened the app."""
    t0 = min(dt.date.fromisoformat(r["created"]) for r in rows)
    t1 = dt.date.fromisoformat(end)
    span = max((t1 - t0).days, 1)
    W, H, pad = 720, 26, 10
    x = lambda d: pad + (W - 2 * pad) * (dt.date.fromisoformat(d) - t0).days / span  # noqa: E731
    biggest = max([_answered(k) for r in rows for k in r["days"].values()] + [1])
    rad = lambda a: 3 + 7 * (a / biggest) ** 0.5  # noqa: E731
    ticks, d = [], t0.replace(day=1)
    while d <= t1:
        for day_ in (1, 15):
            dd = d.replace(day=day_)
            if t0 <= dd <= t1:
                ticks.append(dd)
        d = (d.replace(day=28) + dt.timedelta(days=4)).replace(day=1)
    axis = ['<svg viewBox="0 0 %d 22" class="chart lane-axis" aria-hidden="true">' % W]
    for tk in ticks:
        xx = x(tk.isoformat())
        axis.append(f'<text x="{xx:.1f}" y="15" class="tick" text-anchor="middle">{tk.strftime("%b %-d")}</text>')
    axis.append("</svg>")
    out = ['<div class="lanes-scroll"><div class="lanes">', "".join(axis)]
    for r in rows:
        pct = f", {round(100*r['correct']/r['answers'])}% right" if r["answers"] else ""
        label = (f'<div class="lane-head"><span><b>{esc(r["masked"])}</b> <code>{r["uid"]}</code></span>'
                 f'<span class="lane-sum">{n(r["answers"])} answers{pct} · {plural(len(r["active"]), "active day")} · last {fmt_day(r["last"], False)}</span></div>')
        g = [f'<svg viewBox="0 0 {W} {H}" class="chart lane" role="img" aria-label="Journey of {esc(r["masked"])}">']
        for tk in ticks:
            xx = x(tk.isoformat())
            g.append(f'<line x1="{xx:.1f}" x2="{xx:.1f}" y1="0" y2="{H}" class="grid"/>')
        g.append(f'<line x1="{x(r["created"]):.1f}" x2="{x(r["last"]):.1f}" y1="{H/2}" y2="{H/2}" class="lane-span"/>')
        for d in r["active"]:
            k = r["days"][d]
            tip = f"<title>{fmt_day(d)}: {esc(_plain(describe_day(k)))}</title>"
            a = _answered(k)
            if a:
                g.append(f'<circle cx="{x(d):.1f}" cy="{H/2}" r="{rad(a):.1f}" class="lane-practice">{tip}</circle>')
            elif d == r["created"]:
                g.append(f'<circle cx="{x(d):.1f}" cy="{H/2}" r="4.5" class="lane-signup">{tip}</circle>')
            else:
                g.append(f'<rect x="{x(d)-1.5:.1f}" y="{H/2-5}" width="3" height="10" rx="1" class="lane-open">{tip}</rect>')
            if d == r["created"] and a:
                g.append(f'<circle cx="{x(d):.1f}" cy="{H/2}" r="{rad(a)+3:.1f}" class="lane-signup-ring"/>')
        g.append("</svg>")
        out.append(f'<div class="lane-row">{label}{"".join(g)}</div>')
    out.append("".join(axis).replace("lane-axis", "lane-axis lane-axis-bottom"))
    out.append("</div></div>")
    return "".join(out)


def journey_details(rows: list[dict]) -> str:
    """Each account's days in words, with runs of app-open-only days folded into one line."""
    items = []
    for r in rows:
        lines, run = [], []

        def flush():
            if run:
                rng = fmt_day(run[0], False) + (f"–{fmt_day(run[-1], False)}" if len(run) > 1 else "")
                lines.append(f'<li class="muted">Opened the app on {plural(len(run), "day")} without saving anything ({rng})</li>')
                run.clear()
        for d in r["active"]:
            text = describe_day(r["days"][d])
            if "nothing saved" in text and d != r["created"]:
                run.append(d)
                continue
            flush()
            lines.append(f"<li><span class=\"jd\">{fmt_day(d)}</span><div>{text}</div></li>")
        flush()
        pct = f", {round(100*r['correct']/r['answers'])}% right" if r["answers"] else ""
        meta = f"signed up {fmt_day(r['created'], False)}" + ("" if r["confirmed"] else ", email never confirmed")
        items.append(f'<details class="journey"><summary><b>{esc(r["masked"])}</b> <code>{r["uid"]}</code> '
                     f'<span class="muted">· {meta} · {n(r["answers"])} answers{pct}</span></summary><ul>{"".join(lines)}</ul></details>')
    return "".join(items)


# ── the page ───────────────────────────────────────────────────────────────────

EXTRA_CSS = """
.lanes-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:6px;background:var(--surface)}
.lanes{min-width:600px;display:flex;flex-direction:column;gap:2px;padding:10px 14px}
.lane-row{border-top:1px solid var(--line);padding-top:6px} .lane-row:first-of-type{border-top:0}
.lane-head{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:13.5px;line-height:1.3}
.lane-head code{font-size:11.5px;color:var(--muted)} .lane-sum{color:var(--muted);font-variant-numeric:tabular-nums}
.chart.lane .lane-span{stroke:var(--line);stroke-width:2}
.chart.lane .lane-practice{fill:var(--accent)} .chart.lane .lane-open{fill:var(--muted);opacity:.55}
.chart.lane .lane-signup{fill:var(--surface);stroke:var(--accent);stroke-width:2}
.chart.lane .lane-signup-ring{fill:none;stroke:var(--accent);stroke-width:1.5;opacity:.6}
.chart.lane circle:hover,.chart.lane rect:hover{opacity:.7}
.lane-axis-bottom{margin-top:4px}
.legend .sw{display:inline-block;vertical-align:-2px;margin-right:6px}
.journey{border-top:1px solid var(--line);padding:8px 0} .journey summary{font-size:14.5px;color:var(--fg)}
.journey summary code{font-size:12px;color:var(--muted)} .journey ul{margin-top:8px;font-size:14px;gap:8px}
.journey li{list-style:none;margin-left:-20px;display:grid;grid-template-columns:110px 1fr;gap:10px}
.journey li.muted{display:block;padding-left:120px}
@media (max-width:640px){.journey li{grid-template-columns:1fr;gap:0} .journey li.muted{padding-left:0}}
.jd{color:var(--muted);white-space:nowrap}
.more>details{border-top:1px solid var(--line);padding:12px 0} .more>details>summary{font-family:var(--display);font-size:19px;font-weight:600;color:var(--fg)}
.more>details[open]>summary{margin-bottom:12px} .more>details>*:not(summary)+*{margin-top:12px}
.multiples{display:grid;grid-template-columns:1fr 1fr;gap:12px} @media (max-width:640px){.multiples{grid-template-columns:1fr}}
.mult{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:14px 14px 6px;display:flex;flex-direction:column;gap:2px;min-width:0}
.mult-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-weight:600;font-size:15px}
.mult-head b{font-family:var(--mono);font-weight:500;font-size:22px;font-variant-numeric:tabular-nums}
.mult-sub{font-size:12.5px;color:var(--muted);line-height:1.35}
.chart .hit:hover path{opacity:.75}
details summary{cursor:pointer;color:var(--muted)} details .tbl{margin-top:8px}
.tbl.acct td.who{width:30%;background:var(--surface)} .tbl.acct td.day{white-space:nowrap;width:1%}
.tbl.acct tr.grp td{border-top:2px solid var(--line)} .tbl.acct td code,.tbl td code{font-size:12px;color:var(--muted)}
.scroll{max-height:560px;overflow:auto} .scroll thead th{position:sticky;top:0;background:var(--surface);z-index:1}
table.ret{font-size:13.5px} table.ret th,table.ret td{padding:6px 8px} table.ret td.day{white-space:nowrap}
table.ret td.c1{background:color-mix(in srgb,var(--accent) 22%,transparent)}
table.ret td.c2{background:color-mix(in srgb,var(--accent) 45%,transparent)}
table.ret td.c3,table.ret td.cp{background:var(--accent);color:var(--surface)}
.scroll table.ret tbody tr:not(.hasret) td{color:var(--muted)}
table.ret tfoot td{font-weight:600;border-top:2px solid var(--line);position:sticky;bottom:0;background:var(--surface)}
.dotp{color:var(--accent)} .notes{display:flex;flex-direction:column;gap:12px}
.kpis{grid-template-columns:repeat(auto-fit,minmax(128px,1fr))}
"""


def render(F: dict, notes_html: str = "", generated: str = "") -> str:
    S = F["scalars"]
    partial = F["end"] >= generated[:10] if generated else False
    window = f"{fmt_day(F['start'], False)} – {fmt_day(F['end'], False)} {F['end'][:4]}"
    chans = F["channels"]

    def rate(c, k):
        return round(100 * c[k] / c["new"]) if c["new"] else 0
    ch_rows = [[esc(c["label"]), c["new"], c["engaged"], f'{c["quiz"]} ({rate(c,"quiz")}%)', c["answered"],
                f'{c["returned"]} ({rate(c,"returned")}%)', f'{c["hours"]} h'] for c in chans]
    search = next(c for c in chans if c["label"].startswith("Google"))
    social = next(c for c in chans if c["label"].startswith("LinkedIn"))
    dev_rows = [[name.capitalize(), q, a, f"{100 - round(100*a/q) if q else 0}%"]
                for name, (q, a) in sorted(F["device_funnel"].items(), key=lambda x: -x[1][0]) if q]
    weeks = F.get("weekly_engaged", [])
    this_w, last_w = S.get("engaged_this_week", 0), S.get("engaged_last_week", 0)
    li_days = ", ".join(f"{fmt_day(d, False)} ({v})" for d, v in F["linkedin_top_days"]) or "none"
    countries = ", ".join(f"{esc(c)} {u}" for c, u, _ in F["countries"][:5])
    topics = table(["Exam picked in the quiz builder", "People"], [[esc(t), u] for t, u in F["topics"]])
    exams = table(["Exam study guide read", "People", "Time"], [[esc(e), u, f"{h} h"] for e, u, h in F["exam_pages"]])
    exc_pages = ", ".join(f"<code>{esc(p)}</code> ({u})" for p, _, u in F["exception_pages"][:3])
    exc_browsers = "; ".join(f"{esc(b)}: {k} of {u} people" for b, k, u in F["exception_browsers"][:4])
    jrows = journey_rows(F)
    lane_rows = [r for r in jrows if r["answers"] or len(r["active"]) > 1]
    quiet = [r for r in jrows if r not in lane_rows]
    quiet_line = (f"<p class=\"small muted\">{plural(len(quiet), 'more account')} signed up and did nothing else: "
                  + ", ".join(f"{esc(r['masked'])} ({fmt_day(r['created'], False)})" for r in quiet) + ".</p>") if quiet else ""
    paying = "".join(
        f"<li>A paying subscriber (<code>{p['uid']}</code>) renews {fmt_day(p['period_end'])}" +
        (" and has answered no questions." if not next((r["answers"] for r in F["account_rows"] if r["uid"] == p["uid"]), 0) else ".") + "</li>"
        for p in F["paying"] if p.get("period_end"))
    notes = notes_html.strip() or '<p class="muted">No notes for this run. Write the day\'s reading of the numbers and the actions in a notes file and pass it with <code>--notes</code>.</p>'
    scalars_json = json.dumps({"end": F["end"], "generated": generated, "scalars": S}, sort_keys=True)
    week_kpi = (f"{'this week so far' if partial else 'this week'}, against {last_w} last week") if weeks else ""
    today_note = " Today is partial, and GA4 is still processing it." if partial else ""

    return f"""<title>Actuarial Notes Usage</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>{CSS}{EXTRA_CSS}</style>
<script type="application/json" id="usage-figures">{scalars_json}</script>
<main>
<header>
  <div class="eyebrow">Usage report · {window}{" (today is partial)" if partial else ""} · generated {esc(generated)}</div>
  <h1>How people use Actuarial Notes</h1>
  <p class="muted">From GA4 and the production database, with bots, the e2e suite and the team taken out. How each number is made is under <i>More detail</i> at the end.</p>
</header>

<section>
  <div class="kpis">
    <div class="kpi"><b>{n(S['engaged'])}</b><span>people engaged with the app</span></div>
    <div class="kpi"><b>{this_w}</b><span>engaged {week_kpi}</span></div>
    <div class="kpi"><b>{S['question_answered']}</b><span>people answered a question</span></div>
    <div class="kpi"><b>{S['day2_return']}</b><span>came back on a later day</span></div>
    <div class="kpi"><b>{S['accounts_created']}</b><span>accounts created, {S['accounts_practised']} practised</span></div>
  </div>
</section>

<section class="notes">
  <h2>This run: what changed and what to do</h2>
  {notes}
</section>

<section>
  <h2>1. Usage</h2>
  <div class="figure">
    <div class="legend"><span><i style="background:var(--accent)"></i>Engaged people</span><span><i style="background:var(--accent-soft)"></i>All visitors after the filters (an upper bound)</span></div>
    {daily_chart(F)}
    <p class="small muted">Daily, in the property's time zone. Hover a bar for the day's numbers.{today_note}</p>
  </div>
  <h3>What they did, week by week</h3>
  <p class="small muted">Monday to Sunday, each measure on its own scale; the number beside each title is the window's total.{" The lighter last bar is this week so far." if partial else ""}</p>
  {activity_chart(F, partial)}
</section>

<section>
  <h2>2. Engagement: from first visit to habit</h2>
  <div class="figure">{funnel_chart(S)}
    <p class="small muted">People (browser IDs) who did each at least once in the window.</p>
  </div>
  <ul>
    <li><b>{S['quiz_drop_pct']}% of people who open a quiz never answer a question</b>: {S['mobile_quiz_drop_pct']}% on mobile, {S['desktop_quiz_drop_pct']}% on desktop.</li>
    <li><b>{S['next_visit_pct']}% of new visitors came back on a later day</b> ({S['day2_return']} of {n(S['first_visit'])}). Returning visitors are {S['returning_share_pct']}% of people but {S['returning_time_pct']}% of the time spent in the app.</li>
    <li><b>Search</b> sends the most engaged visitors ({search['engaged']} of {search['new']}), but only {rate(search,'quiz')}% start a quiz; {S['question_landing_sessions']} sessions began on a question page. <b>LinkedIn</b> visitors start quizzes at {rate(social,'quiz')}%.</li>
  </ul>
  {table(["Source", "New visitors", "Engaged", "Start quiz", "Answer", "Came back", "Time"], ch_rows)}
</section>

<section id="journeys">
  <h2>3. Account journeys</h2>
  <p>Every reader account active in the window, one line each, most answers first. Guests can't be followed one by one: GA4 doesn't link a browser's visits to a person.</p>
  <div class="legend">
    <span><svg width="14" height="14" class="sw"><circle cx="7" cy="7" r="5" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/></svg>Signed up</span>
    <span><svg width="16" height="16" class="sw"><circle cx="8" cy="8" r="7" fill="var(--accent)"/></svg>Practised (size = questions answered)</span>
    <span><svg width="8" height="14" class="sw"><rect x="2.5" y="2" width="3" height="10" rx="1" fill="var(--muted)" opacity=".55"/></svg>Opened the app, saved nothing</span>
  </div>
  {swimlanes(lane_rows, F["end"]) if lane_rows else "<p>No account was active in the window.</p>"}
  {quiet_line}
  <ul>
    <li><b>{S['accounts_returned']} of {S['accounts_shown']} accounts came back after their first day</b>, {S['accounts_practised_on_return']} of them to practise.</li>
    <li><b>{S['accounts_pro_key'] + S['paying_subscribers'] + S['accounts_beta']} have Pro:</b> {S['paying_subscribers']} through Stripe, {S['accounts_pro_key']} through an access key ({S['pro_keys_readers']} of {S['pro_keys_total']} keys reached a reader).</li>
    {paying}
  </ul>
  <h3>Each journey, day by day</h3>
  <p class="small muted">Open an account to read its days. Runs of days where the app was only opened are folded into one line.</p>
  <div>{journey_details(lane_rows)}</div>
  <script>document.querySelectorAll('.lanes-scroll').forEach(e => {{ e.scrollLeft = e.scrollWidth; }});</script>
</section>

<section class="more">
  <h2>More detail</h2>
  <details><summary>What people study</summary>
    <div class="two">{topics}{exams}</div>
    <p class="small">Other features, people who used each: flashcard review {S['flashcard_reviewed']}, Concept Craft {S['craft_combined']}, Quiz Battle {S['battle_started']}, PCPA project {S['project_started']}, Store link {S['store_outbound_clicked']}, search {S['search']}.</p>
  </details>
  <details><summary>Returns by first-visit day</summary>
    <p class="small">Each row is the people whose first visit fell on that day; D<i>n</i> counts how many were back <i>n</i> days later. {S['cohort_d1']} of {n(S['cohort_new'])} ({S['next_day_pct']}%) came back the next day.</p>
    {cohort_table(F)}
  </details>
  <details><summary>Audience and devices</summary>
    <ul class="small">
      <li><b>Where people are:</b> {countries}.</li>
      <li><b>Device:</b> {S['mobile_share_pct']}% of people are on mobile, producing {S['mobile_time_pct']}% of the time spent.</li>
      {table(["Device", "Opened quiz", "Answered", "Lost"], dev_rows)}
      <li><b>Concentration:</b> five devices produced {S['top5_device_time_pct']}% of all time spent ({S['engaged_hours']} hours in total).</li>
      <li><b>LinkedIn</b> sent {S['linkedin_visitors']} visitors; its biggest days were {li_days}. <b>ChatGPT</b> sent {S['chatgpt_visitors']}, {S['chatgpt_engaged']} of them engaged.</li>
      <li><b>Guests vs accounts:</b> GA4 recorded {n(S['answer_events'])} answers and accounts saved {n(S['db_answers'])}; at least {S['guest_answer_share_min_pct']}% of answers came from guests.</li>
      <li><b>Daily-plan email:</b> {S['email_optins']} opted in. Content reports from readers: {S['content_reports']}.</li>
    </ul>
  </details>
  <details><summary>Errors and data quality</summary>
    <ul class="small">
      <li><b>{S['exception']} people ({S['exception_pct']}% of engaged people) hit a JavaScript error</b>, most on {exc_pages}. By browser: {exc_browsers}. The error text can't be read until <code>description</code> is registered in GA4.</li>
      <li><b>Taken out:</b> the e2e suite ({n(S['e2e_users'])} IDs), the Singapore crawler ({n(S['crawler_singapore'])}), a Linux crawler ({S['crawler_linux']}), and team traffic ({S['internal_ids']} tagged IDs, {S['internal_time_pct']}% of time). Engaged people are {S['engaged_share_of_ga_pct']}% of GA4's {n(S['ga_users_all'])} "users".</li>
    </ul>
  </details>
  <details><summary>Method</summary>
    <ul class="small">
      <li><b>Window:</b> {window}, GA4 property time zone.</li>
      <li><b>GA4 people:</b> production host only; minus GA4's Internal Traffic label; minus crawler signatures (<code>scripts/usage_report/segments.py</code>); minus the team's untagged devices from the private config. About {n(S['visitors'])} visitors remain; <i>engaged</i> means they fired <code>user_engagement</code>, which the distributed bot never does.</li>
      <li><b>Database:</b> the team's accounts are left out; guests leave nothing in it. Emails are masked; the code is the start of the account's ID.</li>
      <li>How to produce this report: <code>docs/usage-report.md</code>.</li>
    </ul>
  </details>
</section>
</main>"""
