"""Tests for scripts/usage_report: the pure parts (figures, render, the run diff).

Run: python3 -m unittest discover -s scripts -p 'test_usage_report.py'
No network: the data below is synthetic and names no one.
"""
from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "usage_report"))

import figures  # noqa: E402
import render  # noqa: E402
import run  # noqa: E402
from config import Config, TeamDevice  # noqa: E402
from segments import human  # noqa: E402


def synthetic() -> dict:
    ga = {
        "totals": [["100", "90", "150", "80", "36000", "400"]],
        "daily": [["20261101", "60", "40"], ["20261102", "40", "30"]],
        "daily_engaged": [["20261101", "30"], ["20261102", "20"]],
        "weekly_engaged": [["202644", "30"], ["202645", "20"]],
        "events": [["user_engagement", "50", "60"], ["first_visit", "90", "90"], ["first_quiz", "20", "20"],
                   ["question_answered", "8", "40"], ["quiz_completed", "3", "3"], ["day2_return", "9", "9"],
                   ["exception", "5", "6"], ["sign_up", "1", "1"]],
        "ev_channel": [["Organic Search", "first_visit", "40"], ["Organic Search", "user_engagement", "30"],
                       ["Organic Search", "first_quiz", "2"], ["Direct", "first_visit", "50"],
                       ["Referral", "first_visit", "3"]],
        "ev_device": [["mobile", "first_quiz", "10"], ["mobile", "question_answered", "3"],
                      ["desktop", "first_quiz", "10"], ["desktop", "question_answered", "5"]],
        "channel": [["Organic Search", "google", "40", "50", "45", "18000"], ["Direct", "(direct)", "50", "90", "30", "9000"],
                    ["Organic Social", "linkedin.com", "8", "9", "5", "3600"], ["AI Assistant", "chatgpt.com", "2", "2", "1", "60"]],
        "device": [["mobile", "40", "7200"], ["desktop", "60", "28800"]],
        "newret": [["new", "90", "12000"], ["returning", "10", "24000"]],
        "country": [["Canada", "50", "40"], ["United States", "30", "20"]],
        "topics": [["/?topic=Exam%20MAS-I", "5"], ["/?topic=Exam+MAS-I&mode=quiz", "2"], ["/?topic=Probability", "4"]],
        "exam_pages": [["/wiki/exam/Exam+MAS-I+(CAS)", "6", "7200"], ["/wiki/exam/Exam+P-1+(SOA)", "3", "60"]],
        "first_quiz_pages": [["/", "15"], ["/wiki/question/p-1", "1"], ["/wiki/question/fm-2", "1"]],
        "question_landings": [["google", "3", "2", "3"]],
        "top_devices": [["A", "1x1", "18000"], ["B", "1x1", "3600"]],
        "exceptions_page": [["/", "4", "3"]],
        "exceptions_browser": [["Safari", "Macintosh", "3"]],
        "browser_users": [["Safari", "Macintosh", "4"], ["Chrome", "Windows", "60"]],
        "linkedin_daily": [["20261101", "6"], ["20261102", "2"]],
        "chatgpt": [["20261102", "Nigeria", "2", "1"]],
        "cohort": [["2026-11-01", "0000", "60"], ["2026-11-01", "0001", "3"], ["2026-11-02", "0000", "30"],
                   ["2026-10-01", "0000", "5"]],
        "hosts": [["quiz.actuarialnotes.com", "900"], ["127.0.0.1", "1000"]],
        "internal": [["7", "3600"]],
        "prod_engagement": [["72000"]],
        "crawler_singapore": [["700"]],
        "crawler_linux": [["20"]],
        "e2e_host": "127.0.0.1",
        "bot_resolutions": [],
    }
    act = lambda uid, d, k, n=1, s=1, xs=None: {"uid": uid, "d": d, "k": k, "n": n, "s": s, "xs": xs}  # noqa: E731
    db = {
        "accounts": [{"uid": "aaaa1111", "masked": "ab***@example.com", "created": "2026-11-01", "confirmed": True},
                     {"uid": "bbbb2222", "masked": "cd***@example.com", "created": "2026-11-01", "confirmed": True},
                     {"uid": "cccc3333", "masked": "ef***@example.com", "created": "2026-06-01", "confirmed": True}],
        "activity": [act("aaaa1111", "2026-11-01", "signup"), act("aaaa1111", "2026-11-02", "ans", 10, 7),
                     act("aaaa1111", "2026-11-02", "quiz", 1, 10, "mock-exam|Time Series|7/10"),
                     act("bbbb2222", "2026-11-01", "signup"), act("bbbb2222", "2026-11-02", "sub", xs="premium/active"),
                     act("cccc3333", "2026-06-01", "signup")],
        "subscriptions": [{"uid": "bbbb2222", "tier": "premium", "status": "active", "period_end": "2026-11-15", "stripe": True}],
        "pro_keys": {"total": 25, "redeemed": 2, "by_readers": 1},
        "content_reports": 0,
        "email_optins": [{"uid": "aaaa1111", "daily_plan_email": True, "last_sent": None}],
        "team_accounts": 3,
        "all_accounts": 6,
    }
    return {"start": "2026-11-01", "end": "2026-11-02", "ga": ga, "db": db}


class Helpers(unittest.TestCase):
    def test_topic_name(self):
        self.assertEqual(figures.topic_name("/?topic=Exam%20MAS-I&mode=quiz"), "MAS-I")
        self.assertEqual(figures.topic_name("/?topic=Exam+MAS-I"), "MAS-I")
        self.assertEqual(figures.topic_name("/?topic=Financial+Mathematics"), "FM")
        self.assertIsNone(figures.topic_name("/wiki"))

    def test_exam_page_name(self):
        self.assertEqual(figures.exam_page_name("/wiki/exam/Exam+MAS-I+(CAS)"), "MAS-I")
        self.assertEqual(figures.exam_page_name("/wiki/exam/Exam+P-1+(SOA)"), "P-1")


class Compute(unittest.TestCase):
    def setUp(self):
        self.F = figures.compute(synthetic())
        self.S = self.F["scalars"]

    def test_funnel(self):
        self.assertEqual(self.S["engaged"], 50)
        self.assertEqual(self.S["quiz_drop_pct"], 60)          # 8 of 20 answered
        self.assertEqual(self.S["mobile_quiz_drop_pct"], 70)
        self.assertEqual(self.S["first_quiz_from_question_pages"], 2)

    def test_topics_merge_url_variants(self):
        self.assertEqual(dict(self.F["topics"])["MAS-I"], 7)

    def test_cohort_counts(self):
        self.assertEqual(self.S["cohort_new"], 95)
        self.assertEqual(self.S["cohort_d1"], 3)

    def test_accounts(self):
        S = self.S
        self.assertEqual(S["accounts_shown"], 2)                 # the June account is idle in the window
        self.assertEqual(S["accounts_created"], 2)
        self.assertEqual(S["accounts_practised"], 1)
        self.assertEqual(S["accounts_returned"], 1)              # the Stripe renewal is not a return visit
        self.assertEqual(S["paying_subscribers"], 1)
        self.assertEqual(S["paying_without_answers"], 1)
        self.assertEqual(S["db_answers"], 10)
        self.assertEqual(S["guest_answer_share_min_pct"], 75)    # 40 GA answers, 10 in the database

    def test_render_embeds_scalars_and_masks(self):
        page = render.render(self.F, "<p>note</p>", "2026-11-02 12:00 EST")
        self.assertIn('id="usage-figures"', page)
        self.assertIn("ab***@example.com", page)
        self.assertIn("<p>note</p>", page)
        self.assertNotIn("None", page.split("<main>")[1])

    def test_previous_roundtrip_and_diff(self):
        page = render.render(self.F, "", "2026-11-02 12:00 EST")
        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
            f.write(page)
        prev = run.previous_scalars(f.name)
        self.assertEqual(prev, json.loads(json.dumps(self.S)))
        changed = dict(self.S, engaged=51)
        self.assertIn("| Engaged people | 50 | 51 |", run.diff(prev, changed))
        self.assertEqual(run.diff(prev, prev), "No figure changed.")


class Segments(unittest.TestCase):
    def test_team_devices_become_exclusions(self):
        cfg = Config(ga_property="1", supabase_project="x", team_emails=[],
                     team_devices=[TeamDevice(city="Somewhere", resolutions=["100x200"])])
        text = json.dumps(human(cfg))
        self.assertIn("Somewhere", text)
        self.assertIn('"google"', text)  # arrivals from Google are kept by default


if __name__ == "__main__":
    unittest.main()
