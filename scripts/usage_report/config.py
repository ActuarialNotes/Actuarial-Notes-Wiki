"""
config.py — the private half of the usage report: who the team is.

Nothing identifying lives in git. The config is read from, in order:

  1. the USAGE_REPORT_CONFIG environment variable (a JSON string) — set it on
     the Claude Code cloud environment so every session has it;
  2. scripts/usage_report/config.local.json (git-ignored) — for a local machine.

config.example.json shows the shape. See docs/usage-report.md, "Configuration".
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path

HERE = Path(__file__).resolve().parent
LOCAL = HERE / "config.local.json"


@dataclass
class TeamDevice:
    """Untagged traffic from one of the team's own devices: a city plus screen sizes.

    GA4 can't see a device, only a browser ID, so a team member's phone shows up
    under a new ID in every browser and in-app browser it opens the site in, and
    any of them that never opened `?internal=1` is counted as a reader. Sessions
    whose source is in `keep_sources` stay in (a stranger arriving from Google on
    the same model of phone is likelier than the team doing so).
    """
    city: str
    resolutions: list[str]
    keep_sources: list[str] = field(default_factory=lambda: ["google"])


@dataclass
class Config:
    ga_property: str
    supabase_project: str
    team_emails: list[str]
    team_devices: list[TeamDevice]
    window_start: str = "2026-08-01"
    timezone: str = "America/Toronto"
    artifact_url: str | None = None


def load(path: str | None = None) -> Config:
    raw = None
    if path:
        raw = Path(path).read_text()
    elif os.environ.get("USAGE_REPORT_CONFIG"):
        raw = os.environ["USAGE_REPORT_CONFIG"]
    elif LOCAL.exists():
        raw = LOCAL.read_text()
    if raw is None:
        raise SystemExit(
            "No usage-report config. Set USAGE_REPORT_CONFIG (JSON) or create "
            f"{LOCAL.relative_to(HERE.parent.parent)} from config.example.json — "
            "see docs/usage-report.md."
        )
    d = json.loads(raw)
    d["team_devices"] = [TeamDevice(**t) for t in d.get("team_devices", [])]
    return Config(**d)
