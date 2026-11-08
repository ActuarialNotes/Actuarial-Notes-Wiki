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


def account_tables(F: dict) -> tuple[str, str, str]:
    rows = F["account_rows"]
    who = lambda r: f"<b>{esc(r['masked'])}</b> <code>{r['uid']}</code>"  # noqa: E731
    summary = [[who(r), fmt_day(r["created"]), len(r["returns"]),
                ", ".join(fmt_day(d) for d in r["returns"]) or "—", r["answers"]] for r in rows]
    # grid: one column per day offset after first access
    maxoff = max([(dt.date.fromisoformat(d) - dt.date.fromisoformat(r["created"])).days
                  for r in rows for d in r["returns"]] + [1])
    gh = "<tr><th>Account</th><th>First access</th>" + "".join(f'<th class="n">D{k}</th>' for k in range(1, maxoff + 1)) + "</tr>"
    gb = []
    for r in sorted(rows, key=lambda r: r["created"]):
        offs = {(dt.date.fromisoformat(d) - dt.date.fromisoformat(r["created"])).days: d for d in r["returns"]}
        cells = ""
        for k in range(1, maxoff + 1):
            if k in offs:
                p = offs[k] in r["practised_returns"]
                cells += f'<td class="n {"cp" if p else "c1"}" title="{fmt_day(offs[k])}{" · practised" if p else ""}">{"●" if p else "○"}</td>'
            else:
                cells += '<td class="n"></td>'
        first_p = " ●" if "ans" in r["days"].get(r["created"], {}) else ""
        gb.append(f"<tr><td>{who(r)}</td><td class=\"day\">{fmt_day(r['created'])}<span class=\"dotp\">{first_p}</span></td>{cells}</tr>")
    grid = f'<div class="tbl"><table class="ret"><thead>{gh}</thead><tbody>{"".join(gb)}</tbody></table></div>'
    body = []
    for r in rows:
        days = [d for d in r["days"] if any(k != "sub" for k in r["days"][d]) or d == r["created"]] or list(r["days"])
        meta = f"Signed up {fmt_day(r['created'])}" + ("" if r["confirmed"] else " · email never confirmed")
        for j, d in enumerate(days):
            off = (dt.date.fromisoformat(d) - dt.date.fromisoformat(r["created"])).days
            tag = "Sign-up day" if off == 0 else (f"Return · day {off}" if off > 0 else "Before sign-up")
            first = f"<td rowspan='{len(days)}' class='who'>{who(r)}<div class='small muted'>{meta}</div></td>" if j == 0 else ""
            body.append(f"<tr class='{'grp' if j == 0 else ''}'>{first}<td class='day'>{fmt_day(d)}<div class='small muted'>{tag}</div></td><td>{describe_day(r['days'][d])}</td></tr>")
    days_tbl = f'<div class="tbl acct"><table><thead><tr><th>Account</th><th>Day</th><th>What they did</th></tr></thead><tbody>{"".join(body)}</tbody></table></div>'
    return table(["Account", "Signed up", "Return days", "Returned on", "Questions answered"], summary, numeric_from=2), grid, days_tbl


# ── the page ───────────────────────────────────────────────────────────────────

EXTRA_CSS = """
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
    real = [c for c in chans if c["new"] >= 30]
    worst_return = min(real, key=lambda c: rate(c, "returned"))["label"] if real else ""
    dev_rows = [[name.capitalize(), q, a, f"{100 - round(100*a/q) if q else 0}%"]
                for name, (q, a) in sorted(F["device_funnel"].items(), key=lambda x: -x[1][0]) if q]
    weeks = F.get("weekly_engaged", [])
    this_w, last_w = S.get("engaged_this_week", 0), S.get("engaged_last_week", 0)
    week_line = (f"This week has {this_w} engaged people so far, " +
                 ("already more than last week's " if this_w > last_w else "against last week's ") + f"{last_w}.") if weeks else ""
    li_days = ", ".join(f"{fmt_day(d, False)} ({v})" for d, v in F["linkedin_top_days"]) or "none"
    countries = ", ".join(f"{esc(c)} {u}" for c, u, _ in F["countries"][:5])
    topics = table(["Exam picked in the quiz builder", "People"], [[esc(t), u] for t, u in F["topics"]])
    exams = table(["Exam study guide read", "People", "Time"], [[esc(e), u, f"{h} h"] for e, u, h in F["exam_pages"]])
    exc_pages = ", ".join(f"<code>{esc(p)}</code> ({u})" for p, _, u in F["exception_pages"][:3])
    exc_browsers = "; ".join(f"{esc(b)}: {k} of {u} people" for b, k, u in F["exception_browsers"][:4])
    acct_summary, acct_grid, acct_days = account_tables(F)
    acct_table = table(["Of the accounts readers created in the window", "Count"], [
        ["Created", S["accounts_created"]], ["Answered at least one question", S["accounts_practised"]],
        ["Set an exam date", S["accounts_exam_date"]],
        ["Built a flashcard deck of 60+ cards but answered nothing", S["accounts_big_deck_no_answers"]],
        ["Never confirmed their email", S["accounts_unconfirmed"]],
        ["Pro through Stripe (all readers)", S["paying_subscribers"]],
        ["Pro through an access key", S["accounts_pro_key"]], ["Pro through a beta code", S["accounts_beta"]]])
    paying = "".join(
        f"<li>A paying subscriber (<code>{p['uid']}</code>) renews {fmt_day(p['period_end'])}" +
        (" and has answered no questions." if not next((r["answers"] for r in F["account_rows"] if r["uid"] == p["uid"]), 0) else ".") + "</li>"
        for p in F["paying"] if p.get("period_end"))
    top_acct = F["account_rows"][:3]
    top_line = "; ".join(f"<code>{r['uid']}</code> {r['answers']} answers ({round(100*r['correct']/r['answers'])}% right) on {plural(len([d for d in r['days'] if 'ans' in r['days'][d]]), 'day')}"
                         for r in top_acct if r["answers"])
    notes = notes_html.strip() or '<p class="muted">No notes for this run. Write the day\'s reading of the numbers and the actions in a notes file and pass it with <code>--notes</code>.</p>'
    scalars_json = json.dumps({"end": F["end"], "generated": generated, "scalars": S}, sort_keys=True)

    return f"""<title>Actuarial Notes Usage</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>{CSS}{EXTRA_CSS}</style>
<script type="application/json" id="usage-figures">{scalars_json}</script>
<main>
<header>
  <div class="eyebrow">Usage report · {window}{" (today is partial)" if partial else ""} · generated {esc(generated)}</div>
  <h1>Who actually uses Actuarial Notes, and where they stop</h1>
  <p class="muted">Sources: GA4 and the production Supabase database. Bots, the e2e suite and the team's own devices and accounts are taken out of every number below; the method is at the end.</p>
</header>

<section>
  <h2>The short version</h2>
  <div class="kpis">
    <div class="kpi"><b>{n(S['engaged'])}</b><span>people who engaged (of ~{n(round(S['ga_users_all'], -2))} GA4 "users")</span></div>
    <div class="kpi"><b>{S['first_quiz']}</b><span>opened a quiz</span></div>
    <div class="kpi"><b>{S['question_answered']}</b><span>answered at least one question</span></div>
    <div class="kpi"><b>{S['day2_return']}</b><span>came back on a later day</span></div>
    <div class="kpi"><b>{S['accounts_created']}</b><span>new accounts, {S['accounts_practised']} of which practised</span></div>
    <div class="kpi"><b>{S['paying_subscribers']}</b><span>paying subscriber{'s' if S['paying_subscribers'] != 1 else ''}{f", {S['paying_without_answers']} with no questions answered" if S['paying_without_answers'] else ''}</span></div>
  </div>
</section>

<section class="notes">
  <h2>This run: what changed and what to do</h2>
  {notes}
</section>

<section>
  <h2>1. How many people, and when</h2>
  <div class="figure">
    <div class="legend"><span><i style="background:var(--accent-soft)"></i>Visitors after the bot and team filters (upper bound)</span><span><i style="background:var(--accent)"></i>Engaged people (fired <code>user_engagement</code>)</span></div>
    {daily_chart(F)}
    <p class="small muted">Daily, {window}, in the property's time zone. Hover a bar for the day's numbers.{" Today is partial, and GA4 is still processing it." if partial else ""}</p>
  </div>
  <ul>
    <li><b>{S['engaged_share_of_ga_pct']}% of GA4's users are people who engaged.</b> The rest are the e2e suite ({n(S['e2e_users'])}), crawlers and the team. {week_line} The busiest week had {S.get('engaged_peak_week', 0)}.</li>
    <li><b>LinkedIn</b> sent {S['linkedin_visitors']} visitors in the window; its biggest days were {li_days}.</li>
    <li><b>Where people are:</b> {countries}.</li>
    <li><b>Device:</b> {S['mobile_share_pct']}% of people are on mobile, but they produce only {S['mobile_time_pct']}% of engagement time.</li>
    <li><b>Concentration:</b> five devices produced {S['top5_device_time_pct']}% of all engagement time ({S['engaged_hours']} hours in total).</li>
  </ul>
</section>

<section>
  <h2>2. From first visit to habit</h2>
  <div class="figure">{funnel_chart(S)}
    <p class="small muted">People who fired each event at least once in the window. GA4 counts browser IDs, so one person on two browsers counts twice. "Signed up" is GA4's <code>sign_up</code>, which under-counts: readers created {S['accounts_created']} accounts.</p>
  </div>
  {table(["Device", "Opened quiz", "Answered", "Lost"], dev_rows)}
  <ul>
    <li><b>{S['quiz_drop_pct']}% of people who open a quiz never answer a question</b> (mobile {S['mobile_quiz_drop_pct']}%, desktop {S['desktop_quiz_drop_pct']}%). <code>quiz_started</code> fires when the quiz loads, before the pre-quiz concept list; nothing is tracked between that and the first answer.</li>
    <li><b>Where first quizzes start:</b> {S['first_quiz_from_builder']} from the quiz builder (<code>/</code>), {S['first_quiz_from_question_pages']} from a question page (<code>/wiki/question/…</code>).</li>
    <li><b>Finishing a quiz:</b> {S['quiz_completed']} people. {S['streak_extended']} extended a streak, {S['quest_completed']} completed a daily quest, {S['concept_collected']} collected a flashcard.</li>
    <li><b>Return visits:</b> {S['next_visit_pct']}% of new browsers came back on a later day ({S['day2_return']} of {S['first_visit']}). Returning visitors are {S['returning_share_pct']}% of people but {S['returning_time_pct']}% of engagement time.</li>
  </ul>
</section>

<section id="returns">
  <h2>2a. Daily returns</h2>
  <p>Each row is the people whose first visit fell on that day; D<i>n</i> counts how many were back <i>n</i> days later. Someone back on several days appears in several columns.</p>
  {cohort_table(F)}
  <ul>
    <li><b>{S['cohort_d1']} of {n(S['cohort_new'])} new visitors ({S['next_day_pct']}%) came back the next day.</b> Then {S['cohort_d2']} on D2, {S['cohort_d3']} on D3, {S['cohort_d4']} on D4, and {S['cohort_d8plus']} return visits on D8 or later. The last few days' visitors haven't had time to come back.</li>
  </ul>
  <h3>Accounts</h3>
  <p>The same view for signed-in accounts. ● answered questions that day, ○ the app was open but nothing was answered.</p>
  {acct_grid}
</section>

<section>
  <h2>3. Where people come from</h2>
  {table(["Source", "New visitors", "Engaged", "Start quiz", "Answer", "Return later", "Engaged time"], ch_rows)}
  <ul>
    <li><b>Search</b> engages {round(100*search['engaged']/max(search['new'],1))}% of the people it sends, but only {rate(search,'quiz')}% start a quiz. Since question pages went live, {S['question_landing_sessions']} sessions landed on one ({S['question_landing_google']} from Google, {S['question_landing_engaged']} engaged).</li>
    <li><b>Social</b> visitors start quizzes at {rate(social,'quiz')}%; {rate(social,'returned')}% came back on a later day. The lowest return rate among sources with 30+ visitors: {esc(worst_return)}.</li>
    <li><b>ChatGPT</b> sent {S['chatgpt_visitors']} visitors, {S['chatgpt_engaged']} of them engaged. The distributed bot also fakes chatgpt.com as its referrer, so the visitor count overstates it.</li>
  </ul>
</section>

<section>
  <h2>4. What people study</h2>
  <div class="two">{topics}{exams}</div>
  <ul><li><b>Features used:</b> flashcard review {S['flashcard_reviewed']}, Concept Craft {S['craft_combined']} ({S['craft_combinations']} combinations), Quiz Battle {S['battle_started']}, PCPA project {S['project_started']}, Store outbound {S['store_outbound_clicked']}, search {S['search']} people.</li></ul>
</section>

<section>
  <h2>5. Accounts</h2>
  <p>{S['all_accounts']} accounts exist; {S['team_accounts']} are the team's. Readers created {S['accounts_created']} in the window.</p>
  {acct_table}
  <ul>
    <li><b>Most active accounts:</b> {top_line or 'none answered anything'}.</li>
    <li><b>{S['accounts_returned']} of {S['accounts_shown']} accounts came back on a later day</b>, {S['accounts_practised_on_return']} of them to practise. {S['accounts_never_back']} never came back after their first day.</li>
    {paying}
    <li><b>Pro access keys:</b> {S['pro_keys_readers']} of {S['pro_keys_total']} reached a reader.</li>
    <li><b>Guests do most of the practice:</b> GA4 counts {S['answer_events']} answers; the database holds {S['db_answers']} from readers' accounts, so at least {S['guest_answer_share_min_pct']}% came from guests. GA4 also misses readers who block it, so treat that as a floor.</li>
    <li><b>Daily-plan email:</b> {S['email_optins']} reader{'s' if S['email_optins'] != 1 else ''} opted in; {S['email_optins_never_sent']} never received one (it goes to Pro accounts only). Content reports from readers: {S['content_reports']}.</li>
  </ul>
</section>

<section id="accounts">
  <h2>5a. Every account, day by day</h2>
  <p>Every reader account active in the window. Emails are masked; the code is the start of the account's Supabase ID.</p>
  <h3>Who came back</h3>
  {acct_summary}
  <h3>Activity on each day</h3>
  {acct_days}
</section>

<section>
  <h2>6. Errors and data quality</h2>
  <ul>
    <li><b>{S['exception']} people ({S['exception_pct']}% of engaged people) hit a JavaScript exception</b>, most on {exc_pages}. By browser: {exc_browsers}. The error text isn't readable until <code>description</code> is registered as a custom dimension in GA4.</li>
    <li><b>Team traffic:</b> tagged internal traffic is {S['internal_ids']} browser IDs and {S['internal_time_pct']}% of production engagement time.</li>
    <li><b>Bots:</b> the Singapore crawler ({n(S['crawler_singapore'])} IDs at 1280×1200), a headless Linux crawler ({S['crawler_linux']}), and a distributed Windows 1920×1080 bot no filter can remove.</li>
  </ul>
</section>

<section>
  <h2>Method</h2>
  <ul class="small">
    <li><b>Window:</b> {window}, GA4 property time zone.</li>
    <li><b>GA4 people:</b> production host only; minus GA4's Internal Traffic label; minus crawler signatures (screen sizes and OS listed in <code>scripts/usage_report/segments.py</code>); minus the team's untagged devices from the private config. About {n(S['visitors'])} visitors remain; the headline counts the {n(S['engaged'])} who fired <code>user_engagement</code>, which the distributed bot never does.</li>
    <li><b>Supabase:</b> the team's accounts are left out; guests leave nothing in the database.</li>
    <li>How to produce this report: <code>docs/usage-report.md</code>.</li>
  </ul>
</section>
</main>"""
