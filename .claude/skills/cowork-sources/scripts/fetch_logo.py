#!/usr/bin/env python3
"""Transcribe a publisher's own logo URL from their own markup.

`SourceEntity.logo` in `quiz/src/data/coworkSources.ts` is the mark a reader
recognises a source by, and the rule is the vault's: **transcribed, never
constructed**. An approximated or guessed logo is an invented brand, which is
the same mistake as an invented citation — so the URL has to come off the
publisher's own `<link rel="icon">` / `apple-touch-icon`, never from guessing
`/favicon.ico` and never from a third-party icon service.

This script does that transcription and checks it against the three things
`lib/coworkContent.test.ts` enforces:

  1. the URL is https,
  2. its hostname is the same as the entity's `site`,
  3. it actually loads, as an image.

A publisher whose site blocks scripted requests, or publishes no usable mark,
simply has no logo: omit the field and `EntityLogo` falls back to the monogram
tile. That is a supported outcome, not a failure to work around — do not
substitute a guess.

    python3 fetch_logo.py https://www.osfi-bsif.gc.ca

Stdlib only, like every other script in this repo.
"""

from __future__ import annotations

import argparse
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
TIMEOUT = 20

# Preference order. A big square PNG/SVG reads well on the tile at every size;
# a 16px .ico is the last resort but still the publisher's own mark.
REL_RANK = {"apple-touch-icon": 0, "apple-touch-icon-precomposed": 0, "icon": 1, "shortcut icon": 1, "mask-icon": 3}
EXT_RANK = {".svg": 0, ".png": 1, ".jpg": 2, ".jpeg": 2, ".gif": 3, ".ico": 4}


class IconParser(HTMLParser):
    """Collect every <link> whose rel mentions an icon."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.icons: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "link":
            return
        a = {k.lower(): (v or "") for k, v in attrs}
        rel = a.get("rel", "").lower()
        if "icon" not in rel or "stylesheet" in rel:
            return
        if not a.get("href"):
            return
        self.icons.append({"rel": rel, "href": a["href"], "sizes": a.get("sizes", ""), "type": a.get("type", "")})


def get(url: str, method: str = "GET") -> tuple[int, bytes, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            body = r.read(200_000) if method == "GET" else b""
            return r.status, body, r.headers.get("Content-Type", "")
    except urllib.error.HTTPError as e:
        return e.code, b"", ""
    except Exception as e:  # noqa: BLE001 — network shape varies; the caller only needs "no"
        print(f"  ! {type(e).__name__}: {e}", file=sys.stderr)
        return 0, b"", ""


def largest_size(sizes: str) -> int:
    """`180x180 32x32` → 180. Unsized icons rank as 0."""
    return max((int(m) for m in re.findall(r"(\d+)x\d+", sizes)), default=0)


def rank(icon: dict[str, str]) -> tuple[int, int, int]:
    """Best first: the biggest, most modern mark the publisher declares."""
    rel = min((REL_RANK.get(r, 2) for r in icon["rel"].split()), default=2)
    path = urlparse(icon["href"]).path.lower()
    ext = EXT_RANK.get(path[path.rfind("."):], 5) if "." in path else 5
    return (rel, -largest_size(icon["sizes"]), ext)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("site", help="the entity's `site` value, e.g. https://www.osfi-bsif.gc.ca")
    args = ap.parse_args()

    site = args.site.rstrip("/")
    host = urlparse(site).hostname
    if not host:
        print(f"not a URL: {site}", file=sys.stderr)
        return 2

    print(f"fetching {site}")
    status, body, _ = get(site)
    if status != 200 or not body:
        print(f"\n  site returned {status or 'no response'} — no mark can be transcribed.")
        print("  Omit `logo` for this entity; EntityLogo falls back to the monogram tile.")
        return 1

    parser = IconParser()
    parser.feed(body.decode("utf-8", "replace"))
    if not parser.icons:
        print("\n  no <link rel=icon> in the markup — omit `logo`, the monogram is the answer.")
        return 1

    seen: set[str] = set()
    candidates = []
    for icon in sorted(parser.icons, key=rank):
        url = urljoin(site + "/", icon["href"])
        if url in seen:
            continue
        seen.add(url)
        candidates.append((url, icon))

    print(f"\n{len(candidates)} candidate(s), best first:\n")
    chosen = None
    for url, icon in candidates:
        u = urlparse(url)
        notes = []
        ok = True
        if u.scheme != "https":
            notes.append("NOT https — rejected by the test")
            ok = False
        if u.hostname != host:
            notes.append(f"hostname {u.hostname} != site {host} — rejected by the test")
            ok = False
        if ok:
            st, _, ctype = get(url, "GET")
            if st != 200:
                notes.append(f"returned {st or 'no response'}")
                ok = False
            elif "image" not in ctype and not ctype.startswith("binary"):
                notes.append(f"content-type {ctype!r} is not an image")
                ok = False
            else:
                notes.append(f"200 {ctype}")
        mark = "OK " if ok else "   "
        size = icon["sizes"] or "-"
        print(f"  {mark}{url}\n      rel={icon['rel']!r} sizes={size}  {'; '.join(notes)}")
        if ok and chosen is None:
            chosen = url

    if chosen is None:
        print("\n  nothing usable — omit `logo`, and let the monogram stand.")
        return 1

    print("\nAuthor it as:\n")
    print(f"    site: '{site}',")
    print(f"    logo: '{chosen}',")
    return 0


if __name__ == "__main__":
    sys.exit(main())
