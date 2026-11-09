"""
segments.py — who counts as a person in GA4.

GA4's own user count is ~97% machines. The human segment is the production
host, minus GA4's Internal Traffic label, minus the automation signatures below,
minus the team's untagged devices (from config). Even then a distributed bot
(Windows, 1920x1080, "direct", one page, zero engagement) gets through, because
real readers share its screen size; that is why the report's headline is
*engaged people* (fired `user_engagement`), which that bot never does.

The signatures are public facts about crawlers, not about anyone, so they live
here. Add one when a new crawler shows up: see docs/usage-report.md, "Bots".
"""
from __future__ import annotations

from config import Config

PROD_HOST = "quiz.actuarialnotes.com"
E2E_HOST = "127.0.0.1"  # Playwright's baseURL: the e2e suite from GitHub Actions

# Screen sizes only headless crawlers report (the Singapore crawler is 1280x1200).
BOT_RESOLUTIONS = ["1280x1200", "800x600", "1600x1600", "1280x600", "1280x900",
                   "390x664", "1600x1200", "1280x1280"]
# (operatingSystem, screenResolution) pairs seen only from crawlers.
BOT_OS_RESOLUTIONS = [("Linux", "1440x900"), ("Macintosh", "375x812")]


def f_eq(field: str, value: str) -> dict:
    return {"filter": {"fieldName": field, "stringFilter": {"value": value}}}


def f_in(field: str, values: list[str]) -> dict:
    return {"filter": {"fieldName": field, "inListFilter": {"values": values}}}


def f_begins(field: str, value: str) -> dict:
    return {"filter": {"fieldName": field, "stringFilter": {"matchType": "BEGINS_WITH", "value": value}}}


def f_contains(field: str, value: str) -> dict:
    return {"filter": {"fieldName": field, "stringFilter": {"matchType": "CONTAINS", "value": value}}}


def f_not(expr: dict) -> dict:
    return {"notExpression": expr}


def f_and(*exprs: dict) -> dict:
    return {"andGroup": {"expressions": list(exprs)}}


def event(name: str) -> dict:
    return f_eq("eventName", name)


PROD = f_eq("hostName", PROD_HOST)
INTERNAL = f_eq("testDataFilterName", "Internal Traffic")
NOT_INTERNAL = f_not(INTERNAL)


def bot_exclusions() -> list[dict]:
    out = [f_not(f_in("screenResolution", BOT_RESOLUTIONS)),
           f_not(f_eq("operatingSystem", "(not set)"))]
    for os_, res in BOT_OS_RESOLUTIONS:
        out.append(f_not(f_and(f_eq("operatingSystem", os_), f_eq("screenResolution", res))))
    return out


def team_exclusions(cfg: Config) -> list[dict]:
    out = []
    for dev in cfg.team_devices:
        parts = [f_eq("city", dev.city), f_in("screenResolution", dev.resolutions)]
        if dev.keep_sources:
            parts.append(f_not(f_in("sessionSource", dev.keep_sources)))
        out.append(f_not(f_and(*parts)))
    return out


def human(cfg: Config) -> list[dict]:
    """The full human segment, as a list of AND-ed filter expressions."""
    return [PROD, NOT_INTERNAL, *bot_exclusions(), *team_exclusions(cfg)]
