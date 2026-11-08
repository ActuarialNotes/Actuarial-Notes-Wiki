"""
api.py — the two data sources the usage report reads: the GA4 Data API and the
Supabase Management API's SQL endpoint.

Both are called through `curl`, which honours HTTPS_PROXY and the system CA
bundle. That matters in a Claude Code cloud session, where the agent proxy
injects the credentials for analyticsdata.googleapis.com and api.supabase.com
and any token the client sends is replaced. Anywhere else, set:

  GA_ACCESS_TOKEN        an OAuth access token with analytics.readonly
                         (e.g. `gcloud auth print-access-token`)
  SUPABASE_ACCESS_TOKEN  a Supabase personal access token

Stdlib only, like the rest of scripts/.
"""
from __future__ import annotations

import json
import os
import subprocess
from typing import Any

GA_URL = "https://analyticsdata.googleapis.com/v1beta/properties/{prop}:runReport"
SUPABASE_URL = "https://api.supabase.com/v1/projects/{ref}/database/query"


class ApiError(RuntimeError):
    pass


def _post(url: str, body: dict, token_env: str) -> Any:
    token = os.environ.get(token_env) or "dummy"  # the cloud proxy replaces it
    out = subprocess.run(
        ["curl", "-sS", "-X", "POST", url,
         "-H", "Content-Type: application/json",
         "-H", f"Authorization: Bearer {token}",
         "--data-binary", "@-"],
        input=json.dumps(body), capture_output=True, text=True, check=False,
    )
    if out.returncode != 0:
        raise ApiError(f"curl failed for {url}: {out.stderr.strip()}")
    try:
        data = json.loads(out.stdout)
    except json.JSONDecodeError as e:
        raise ApiError(f"non-JSON reply from {url}: {out.stdout[:300]}") from e
    if isinstance(data, dict) and data.get("error"):
        err = data["error"]
        raise ApiError(f"{url}: {err.get('message', err) if isinstance(err, dict) else err}")
    if isinstance(data, dict) and data.get("message") and "supabase" in url:
        raise ApiError(f"{url}: {data['message']}")
    return data


def ga_report(prop: str, body: dict) -> list[list[str]]:
    """Run one GA4 runReport and return its rows as [dims..., metrics...] strings."""
    data = _post(GA_URL.format(prop=prop), body, "GA_ACCESS_TOKEN")
    return [
        [v["value"] for v in r.get("dimensionValues", [])] + [v["value"] for v in r.get("metricValues", [])]
        for r in data.get("rows", [])
    ]


def sql(ref: str, query: str) -> list[dict]:
    """Run one read-only SQL query against the project's database."""
    data = _post(SUPABASE_URL.format(ref=ref), {"query": query}, "SUPABASE_ACCESS_TOKEN")
    if not isinstance(data, list):
        raise ApiError(f"unexpected SQL reply: {str(data)[:300]}")
    return data
