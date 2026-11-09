"""
pull.py — fetch everything the usage report needs, for one window, into one dict.

Every GA4 figure is computed over the human segment (segments.human) unless the
key says otherwise; every Supabase figure leaves out the team's accounts
(config.team_emails). Nothing here interprets the numbers: that is figures.py.
"""
from __future__ import annotations

import datetime as dt

import api
from config import Config
from segments import (BOT_RESOLUTIONS, E2E_HOST, INTERNAL, PROD, event, f_and, f_begins,
                      f_eq, f_in, human)

FUNNEL_EVENTS = ["first_visit", "user_engagement", "first_quiz", "question_answered",
                 "quiz_completed", "day2_return", "sign_up"]


class Puller:
    def __init__(self, cfg: Config, start: str, end: str):
        self.cfg, self.start, self.end = cfg, start, end
        self.human = human(cfg)

    def ga(self, dims, mets, extra=(), segment="human", limit=1000, order=None, start=None, end=None):
        exprs = {"human": self.human, "prod": [PROD], "all": []}[segment] + list(extra)
        body = {
            "dateRanges": [{"startDate": start or self.start, "endDate": end or self.end}],
            "dimensions": [{"name": d} for d in dims],
            "metrics": [{"name": m} for m in mets],
            "limit": limit,
            "orderBys": order or [{"metric": {"metricName": mets[0]}, "desc": True}],
        }
        if exprs:
            body["dimensionFilter"] = {"andGroup": {"expressions": exprs}}
        return api.ga_report(self.cfg.ga_property, body)

    def cohorts(self) -> list[list[str]]:
        """Active users by first-session date × visit date, as [first day, "000n", users].

        A plain report rather than GA4's cohortSpec: the cohort engine's
        cohortActiveUsers changes with the other metrics in the request (asking
        for cohortTotalUsers too cut next-day returns by about a third), so it
        can't be trusted. See docs/usage-report.md, "Traps".
        """
        rows = self.ga(["firstSessionDate", "date"], ["activeUsers"], limit=100000,
                       order=[{"dimension": {"dimensionName": "firstSessionDate"}}])
        out = []
        for first, day, users in rows:
            if not first.isdigit():
                continue  # "(not set)" or empty: GA4 lost the first session
            f = dt.datetime.strptime(first, "%Y%m%d").date()
            if f < dt.date.fromisoformat(self.start):
                continue  # first visit before the window: not a new visitor in it
            off = (dt.datetime.strptime(day, "%Y%m%d").date() - f).days
            out.append([f.isoformat(), f"{off:04d}", users])
        return out

    def sql(self, q: str) -> list[dict]:
        return api.sql(self.cfg.supabase_project, q)


def pull_ga(p: Puller) -> dict:
    by_date = [{"dimension": {"dimensionName": "date"}}]
    eng = [event("user_engagement")]
    g: dict = {}
    g["totals"] = p.ga([], ["totalUsers", "newUsers", "sessions", "engagedSessions",
                            "userEngagementDuration", "screenPageViews"])
    g["daily"] = p.ga(["date"], ["totalUsers", "engagedSessions"], order=by_date)
    g["daily_engaged"] = p.ga(["date"], ["totalUsers"], extra=eng, order=by_date)
    g["weekly_engaged"] = p.ga(["isoYearIsoWeek"], ["totalUsers"], extra=eng,
                               order=[{"dimension": {"dimensionName": "isoYearIsoWeek"}}])
    g["events"] = p.ga(["eventName"], ["totalUsers", "eventCount"])
    fun = [f_in("eventName", FUNNEL_EVENTS)]
    g["ev_channel"] = p.ga(["sessionDefaultChannelGroup", "eventName"], ["totalUsers"], extra=fun)
    g["ev_device"] = p.ga(["deviceCategory", "eventName"], ["totalUsers"], extra=fun)
    g["channel"] = p.ga(["sessionDefaultChannelGroup", "sessionSource"],
                        ["totalUsers", "sessions", "engagedSessions", "userEngagementDuration"])
    g["device"] = p.ga(["deviceCategory"], ["totalUsers", "userEngagementDuration"])
    g["newret"] = p.ga(["newVsReturning"], ["totalUsers", "userEngagementDuration"])
    g["country"] = p.ga(["country"], ["totalUsers", "engagedSessions"], limit=10)
    g["topics"] = p.ga(["pagePathPlusQueryString"], ["totalUsers"], extra=[f_begins("pagePathPlusQueryString", "/?topic=")], limit=200)
    g["exam_pages"] = p.ga(["pagePath"], ["totalUsers", "userEngagementDuration"], extra=[f_begins("pagePath", "/wiki/exam/")], limit=60)
    g["first_quiz_pages"] = p.ga(["pagePath"], ["totalUsers"], extra=[event("first_quiz")], limit=200)
    g["question_landings"] = p.ga(["sessionSource"], ["sessions", "engagedSessions", "totalUsers"],
                                  extra=[f_begins("landingPage", "/wiki/question/")])
    g["top_devices"] = p.ga(["city", "screenResolution"], ["userEngagementDuration"], limit=5)
    g["exceptions_page"] = p.ga(["unifiedPagePathScreen"], ["eventCount", "totalUsers"], extra=[event("exception")], limit=10)
    g["exceptions_browser"] = p.ga(["browser", "operatingSystem"], ["totalUsers"], extra=[event("exception")], limit=20)
    g["browser_users"] = p.ga(["browser", "operatingSystem"], ["totalUsers"], limit=40)
    g["linkedin_daily"] = p.ga(["date"], ["totalUsers"], extra=[f_in("sessionSource", ["linkedin.com", "lnkd.in"])], order=by_date)
    g["chatgpt"] = p.ga(["date", "country"], ["totalUsers", "engagedSessions"], extra=[f_eq("sessionSource", "chatgpt.com")])
    g["cohort"] = p.cohorts()
    # Outside the human segment: how much of GA4 is machines and the team.
    g["hosts"] = p.ga(["hostName"], ["totalUsers"], segment="all")
    g["internal"] = p.ga([], ["totalUsers", "userEngagementDuration"], segment="prod", extra=[INTERNAL])
    g["prod_engagement"] = p.ga([], ["userEngagementDuration"], segment="prod")
    g["crawler_singapore"] = p.ga([], ["totalUsers"], segment="prod", extra=[f_eq("screenResolution", "1280x1200")])
    g["crawler_linux"] = p.ga([], ["totalUsers"], segment="prod",
                              extra=[f_and(f_eq("operatingSystem", "Linux"), f_eq("screenResolution", "1440x900"))])
    g["e2e_host"] = E2E_HOST
    g["bot_resolutions"] = BOT_RESOLUTIONS
    return g


def _emails(cfg: Config) -> str:
    return ",".join("'" + e.replace("'", "''") + "'" for e in cfg.team_emails) or "''"


ACTIVITY_SQL = """
with u as (select id from auth.users where email not in ({team})),
ev as (
 select user_id, (answered_at at time zone '{tz}')::date d, 'ans' k, is_correct::int v, question_id x from question_responses
 union all select user_id,(completed_at at time zone '{tz}')::date,'quiz',total_questions, mode||'|'||coalesce(topic,'')||'|'||correct_count||'/'||total_questions from quiz_sessions
 union all select user_id,(collected_at at time zone '{tz}')::date,'card',1,null from user_collected_cards
 union all select user_id,(added_at at time zone '{tz}')::date,'deck',1,null from user_flashcards
 union all select user_id,(at at time zone '{tz}')::date,'lvl',1,to_state from concept_level_events
 union all select user_id,(updated_at at time zone '{tz}')::date,'exam',1,exam_id||coalesce(':'||target_date::text,'') from exam_progress
 union all select user_id::uuid,(created_at at time zone '{tz}')::date,'login',1,null from auth.refresh_tokens
 union all select user_id,(created_at at time zone '{tz}')::date,'sess',1,null from auth.sessions
 union all select id,(created_at at time zone '{tz}')::date,'signup',1,null from auth.users
 union all select user_id,(updated_at at time zone '{tz}')::date,'sub',1,tier||'/'||status from user_subscriptions
 union all select redeemed_by,(redeemed_at at time zone '{tz}')::date,'key',1,null from pro_access_keys where redeemed_by is not null
 union all select user_id,(redeemed_at at time zone '{tz}')::date,'beta',1,null from beta_code_redemptions
 union all select user_id,(updated_at at time zone '{tz}')::date,'email',1,daily_plan_email::text from user_email_prefs
 union all select user_id,(updated_at at time zone '{tz}')::date,'proj',1,null from user_project_attempts
)
select left(e.user_id::text,8) uid, d::text d, k, count(*) n, sum(v) s, string_agg(distinct x, '; ') xs
from ev e join u on u.id=e.user_id where d is not null and d <= '{end}' group by 1,2,3 order by 1,2,3
"""


def pull_db(p: Puller) -> dict:
    cfg, team, tz = p.cfg, _emails(p.cfg), p.cfg.timezone
    db: dict = {}
    db["accounts"] = p.sql(f"""
      select left(id::text,8) uid, regexp_replace(email,'^(.{{2}})[^@]*','\\1***') masked,
             (created_at at time zone '{tz}')::date::text created, email_confirmed_at is not null confirmed
      from auth.users where email not in ({team}) order by created_at""")
    db["activity"] = p.sql(ACTIVITY_SQL.format(team=team, tz=tz, end=p.end))
    db["subscriptions"] = p.sql(f"""
      select left(s.user_id::text,8) uid, tier, status, current_period_end::date::text period_end,
             stripe_subscription_id is not null stripe
      from user_subscriptions s join auth.users u on u.id=s.user_id where u.email not in ({team})""")
    db["pro_keys"] = p.sql(f"""
      select count(*) total,
             count(*) filter (where redeemed_at is not null) redeemed,
             count(*) filter (where redeemed_by in (select id from auth.users where email not in ({team}))) by_readers
      from pro_access_keys""")[0]
    db["content_reports"] = p.sql(f"""
      select count(*) n from content_reports r left join auth.users u on u.id=r.user_id
      where r.created_at >= '{p.start}' and (u.email is null or u.email not in ({team}))""")[0]["n"]
    db["email_optins"] = p.sql(f"""
      select left(e.user_id::text,8) uid, daily_plan_email, last_sent_date::text last_sent
      from user_email_prefs e join auth.users u on u.id=e.user_id where u.email not in ({team})""")
    db["team_accounts"] = p.sql(f"select count(*) n from auth.users where email in ({team})")[0]["n"]
    db["all_accounts"] = p.sql("select count(*) n from auth.users")[0]["n"]
    return db


def pull(cfg: Config, start: str, end: str) -> dict:
    p = Puller(cfg, start, end)
    return {"start": start, "end": end, "ga": pull_ga(p), "db": pull_db(p)}
