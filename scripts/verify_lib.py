#!/usr/bin/env python3
"""
verify_lib.py — the shared core of VERIFY, the content-validation layer.

Everything that reads or writes a `verification:` frontmatter block or a
`.verify/` sidecar log goes through this module, so the CI checker, the backfill,
the report sync and the dashboard generator can never disagree about what a
block means or where a log lives.

Two rules from the spec drive the whole design:

  * **P3 — append-only.** Log entries are never edited or deleted, only
    superseded by later entries that reference them. Nothing here rewrites an
    existing entry; `append_entry` only ever adds to the end of a file.
  * **P4 — verification is bound to content, not to a filename.** Every block
    carries a hash of the file *excluding the verification block itself*, so
    writing the block back is not itself an edit. Any other change to the file —
    frontmatter or body — changes the hash and downgrades the status to `stale`.

The hash deliberately covers the non-`verification` frontmatter as well as the
body. The spec's "body only, excluding this block" is about excluding the block,
not about ignoring the rest of the frontmatter: for a question file `answer:` and
`wiki_link:` live in the frontmatter and are exactly what a verification pass
checks, so an edit to them must invalidate the pass.

Everything is written to be hand-writable and hand-readable: a human can open a
log in Obsidian and append a comment entry by hand, and the emitter here
round-trips what they wrote.
"""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Any, Iterable, Iterator

REPO_ROOT = Path(__file__).resolve().parent.parent
VERIFY_DIR = REPO_ROOT / ".verify"
RUNS_DIRNAME = "_runs"

# ─── Schema constants ─────────────────────────────────────────────────────────

STATUSES = ("unverified", "in_review", "verified", "disputed", "stale")
CONFIDENCES = ("high", "medium", "low")

#: Statuses that assert something about the *current* bytes of the file. When the
#: content hash stops matching, these are downgraded to `stale` (P4).
#:
#: `disputed` is deliberately not in this set. A dispute is an unresolved
#: conflict that a human still has to settle; collapsing it into `stale` on the
#: next unrelated edit would quietly hide the one status that means "we know
#: something here is wrong".
CLAIMING_STATUSES = ("verified", "in_review")

#: Order the block's keys are always emitted in. Also the required-key list.
VERIFICATION_KEYS = (
    "status",
    "confidence",
    "last_checked",
    "last_checked_by",
    "content_hash",
    "sources",
    "open_findings",
    # Not in the original spec's block, and added for one concrete reason: the
    # app excludes a question with an open *critical* finding from quiz
    # sessions, and sidecar logs are deliberately not bundled at build time, so
    # severity has to reach the client some other way. Derived from the log by
    # `verify_check.py --sync`, exactly like `open_findings`.
    "open_critical",
    "log",
)

ENTRY_TYPES = ("finding", "correction", "comment", "question", "resolution")
SEVERITIES = ("critical", "major", "minor", "nit")
ENTRY_STATUSES = ("open", "resolved", "wontfix", "superseded")

#: Entry statuses that close the finding an entry `resolves:`.
CLOSING_STATUSES = ("resolved", "wontfix", "superseded")

HASH_RE = re.compile(r"^sha256:[0-9a-f]{64}$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ACTOR_RE = re.compile(r"^(agent|human):[A-Za-z0-9._@+-]+$")
FINDING_ID_RE = re.compile(r"^F-\d{3,}$")

# ─── Content roots ────────────────────────────────────────────────────────────

#: Directories under the vault root whose every `.md` file carries a block.
CONTENT_DIRS = ("questions", "Concepts", "Resources")

#: Root-level exam pages, matched by filename.
EXAM_PAGE_RE = re.compile(r"^Exam\b.*\.md$", re.IGNORECASE)


def iter_content_files(root: Path | None = None) -> Iterator[Path]:
    """Every vault file that must carry a verification block, sorted."""
    root = root or REPO_ROOT
    found: list[Path] = []
    for name in sorted(p.name for p in root.iterdir() if p.is_file()):
        if EXAM_PAGE_RE.match(name):
            found.append(root / name)
    for dirname in CONTENT_DIRS:
        base = root / dirname
        if not base.is_dir():
            continue
        found.extend(sorted(base.rglob("*.md")))
    for path in found:
        yield path


def is_content_file(path: Path, root: Path | None = None) -> bool:
    root = root or REPO_ROOT
    try:
        rel = path.resolve().relative_to(root.resolve())
    except ValueError:
        return False
    parts = rel.parts
    if len(parts) == 1:
        return bool(EXAM_PAGE_RE.match(parts[0]))
    return parts[0] in CONTENT_DIRS and rel.suffix == ".md"


def rel_path(path: Path, root: Path | None = None) -> str:
    """Repo-relative POSIX path — the form used in `target:` and `log:` keys."""
    root = root or REPO_ROOT
    return path.resolve().relative_to(root.resolve()).as_posix()


def log_path_for(content_path: str | Path, root: Path | None = None) -> Path:
    """`questions/exam-5/q.md` → `<root>/.verify/questions/exam-5/q.md`.

    The sidecar mirrors the vault path exactly. Sidecars rather than inline
    sections keep student-facing pages clean, keep Obsidian rendering unchanged,
    and let a log grow without bloating what the app bundles at build time.
    """
    root = root or REPO_ROOT
    rel = content_path if isinstance(content_path, str) else rel_path(content_path, root)
    return root / ".verify" / rel


def log_rel_for(content_path: str | Path, root: Path | None = None) -> str:
    root = root or REPO_ROOT
    rel = content_path if isinstance(content_path, str) else rel_path(content_path, root)
    return f".verify/{rel}"


def content_rel_for_log(log_path: str | Path, root: Path | None = None) -> str:
    """Inverse of `log_rel_for`: the vault path a sidecar log is about."""
    root = root or REPO_ROOT
    rel = log_path if isinstance(log_path, str) else rel_path(log_path, root)
    return rel[len(".verify/"):] if rel.startswith(".verify/") else rel


# ─── Frontmatter splitting ────────────────────────────────────────────────────

def split_frontmatter(text: str) -> tuple[str | None, str]:
    """Split a file into (frontmatter body text, rest).

    Returns `(None, text)` when the file has no leading `---` block. The
    frontmatter text excludes both `---` fences and the newline after the
    closing fence.
    """
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    if not normalized.startswith("---\n"):
        return None, normalized
    end = normalized.find("\n---", 3)
    while end != -1:
        after = normalized[end + 4:]
        # The closing fence must be a line of its own: `---` then EOL or EOF.
        if after == "" or after.startswith("\n"):
            fm_text = normalized[4:end + 1]
            body = after[1:] if after.startswith("\n") else ""
            return fm_text.rstrip("\n"), body
        end = normalized.find("\n---", end + 1)
    return None, normalized


def _is_continuation(line: str) -> bool:
    return line[:1] in (" ", "\t") or line.strip() == ""


def split_verification_lines(fm_text: str) -> tuple[list[str], list[str]]:
    """Split frontmatter lines into (everything else, the verification block).

    Trailing blank lines that follow the block are swallowed into it, so removing
    the block from a file leaves no stray gap.
    """
    lines = fm_text.split("\n")
    other: list[str] = []
    block: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r"^verification:\s*(#.*)?$", line) or re.match(r"^verification:\s*\S", line):
            block.append(line)
            i += 1
            while i < len(lines) and _is_continuation(lines[i]):
                block.append(lines[i])
                i += 1
            continue
        other.append(line)
        i += 1
    return other, block


# ─── Content hashing (P4) ─────────────────────────────────────────────────────

def _normalize_for_hash(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = [ln.rstrip() for ln in text.split("\n")]
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    return "\n".join(lines) + "\n"


def hashable_content(text: str) -> str:
    """The exact bytes `content_hash` covers: the file minus its own block.

    Whitespace is normalised (line endings, trailing spaces, leading/trailing
    blank lines) so that a reformat-only touch doesn't invalidate a real
    verification pass, while any change of substance does.
    """
    fm_text, body = split_frontmatter(text)
    if fm_text is None:
        return _normalize_for_hash(body)
    other, _block = split_verification_lines(fm_text)
    return _normalize_for_hash("\n".join(other) + "\n" + body)


def content_hash(text: str) -> str:
    digest = hashlib.sha256(hashable_content(text).encode("utf-8")).hexdigest()
    return f"sha256:{digest}"


# ─── The verification block ───────────────────────────────────────────────────

def _yaml_scalar(value: Any) -> str:
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, date):
        return value.isoformat()
    text = str(value)
    if text == "":
        return '""'
    # Quote anything that isn't a plain, unambiguous scalar. Dates, statuses,
    # hashes and `agent:x`-style actors are emitted bare for readability; a
    # source citation full of commas, colons and em dashes gets quoted.
    if DATE_RE.match(text) or HASH_RE.match(text) or ACTOR_RE.match(text):
        return text
    if re.match(r"^[A-Za-z0-9.][A-Za-z0-9 ._/()+-]*$", text) and not text.endswith(" "):
        return text
    escaped = text.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def render_verification(block: dict[str, Any]) -> str:
    """Emit the block as YAML, keys in the canonical order.

    Hand-written by design: no flow style, no anchors, one key per line.
    """
    out = ["verification:"]
    for key in VERIFICATION_KEYS:
        value = block.get(key)
        if key == "sources":
            items = list(value or [])
            if not items:
                out.append("  sources: []")
            else:
                out.append("  sources:")
                out.extend(f"    - {_yaml_scalar(item)}" for item in items)
            continue
        out.append(f"  {key}: {_yaml_scalar(value)}")
    return "\n".join(out)


def new_block(content_text: str, log_rel: str) -> dict[str, Any]:
    """A never-checked block for a file being backfilled."""
    return {
        "status": "unverified",
        "confidence": None,
        "last_checked": None,
        "last_checked_by": None,
        "content_hash": content_hash(content_text),
        "sources": [],
        "open_findings": 0,
        "open_critical": 0,
        "log": log_rel,
    }


def _parse_scalar(text: str) -> Any:
    """Parse one YAML scalar, restricted to the shapes this schema uses."""
    raw = text.strip()
    if raw == "" or raw in ("null", "~", "Null", "NULL"):
        return None
    if raw == "[]":
        return []
    if raw.startswith('"') and raw.endswith('"') and len(raw) >= 2:
        return raw[1:-1].replace('\\"', '"').replace("\\\\", "\\")
    if raw.startswith("'") and raw.endswith("'") and len(raw) >= 2:
        return raw[1:-1].replace("''", "'")
    if re.match(r"^-?\d+$", raw):
        return int(raw)
    if raw in ("true", "false", "True", "False"):
        return raw.lower() == "true"
    return raw


def parse_verification(text: str) -> dict[str, Any] | None:
    """Read the block out of a file's frontmatter. `None` when there is none.

    Hand-parsed rather than handed to a YAML library on purpose: the schema is
    small and fixed, this keeps the CI check dependency-free like the rest of
    `scripts/`, and — more importantly — anything outside the documented shapes
    raises instead of being silently coerced. A malformed block must fail CI, not
    quietly read as "unverified".
    """
    fm_text, _body = split_frontmatter(text)
    if fm_text is None:
        return None
    _other, block_lines = split_verification_lines(fm_text)
    if not block_lines:
        return None

    head = block_lines[0]
    if not re.match(r"^verification:\s*$", head):
        raise ValueError("`verification:` must introduce an indented block")

    result: dict[str, Any] = {}
    i = 1
    while i < len(block_lines):
        line = block_lines[i]
        if line.strip() == "":
            i += 1
            continue
        match = re.match(r"^  ([A-Za-z_][A-Za-z0-9_]*):(?:[ \t]+(.*))?$", line)
        if not match:
            raise ValueError(f"unparseable verification line: {line.strip()!r}")
        key, raw_value = match.group(1), match.group(2)
        i += 1
        if raw_value is None or raw_value.strip() == "":
            items: list[Any] = []
            while i < len(block_lines):
                item = re.match(r"^    -[ \t]+(.*)$", block_lines[i])
                if not item:
                    break
                items.append(_parse_scalar(item.group(1)))
                i += 1
            result[key] = items
            continue
        result[key] = _parse_scalar(raw_value)
    return result


def upsert_verification(text: str, block: dict[str, Any]) -> str:
    """Return `text` with `block` written as the last frontmatter key.

    Creates the frontmatter when the file has none — concept and exam pages are
    plain markdown today. The body is otherwise byte-identical, so this is safe
    to run over the whole vault.
    """
    rendered = render_verification(block)
    fm_text, body = split_frontmatter(text)
    if fm_text is None:
        return f"---\n{rendered}\n---\n\n{text.replace(chr(13), '').lstrip(chr(10))}"
    other, _old = split_verification_lines(fm_text)
    while other and other[-1].strip() == "":
        other.pop()
    kept = "\n".join(other)
    fm_out = f"{kept}\n{rendered}" if kept else rendered
    return f"---\n{fm_out}\n---\n{body}"


# ─── Sidecar logs ─────────────────────────────────────────────────────────────

@dataclass
class LogEntry:
    """One `## [ID] Title` block of a sidecar log."""

    entry_id: str
    title: str
    fields: dict[str, str] = field(default_factory=dict)
    raw: str = ""

    @property
    def entry_type(self) -> str:
        return (self.fields.get("entry_type") or "").strip().lower()

    @property
    def status(self) -> str:
        return (self.fields.get("status") or "").strip().lower()

    @property
    def severity(self) -> str:
        return (self.fields.get("severity") or "").strip().lower()

    @property
    def resolves(self) -> str:
        return (self.fields.get("resolves") or "").strip()

    @property
    def entry_date(self) -> str:
        return (self.fields.get("date") or "").strip()

    @property
    def author(self) -> str:
        return (self.fields.get("author") or "").strip()


@dataclass
class VerificationLog:
    path: Path
    target: str
    created: str
    entries: list[LogEntry] = field(default_factory=list)

    def findings(self) -> list[LogEntry]:
        return [e for e in self.entries if e.entry_type == "finding"]

    def open_findings(self) -> list[LogEntry]:
        """Findings that are still open, accounting for later resolutions.

        A finding closes either by carrying a closing status itself or by a later
        entry that `resolves:` it and does. Nothing is ever edited in place, so
        "is it still open" is always a question about the entries *after* it.
        """
        closed: set[str] = set()
        for entry in self.entries:
            if entry.resolves and entry.status in CLOSING_STATUSES:
                closed.add(entry.resolves)
            if entry.status in CLOSING_STATUSES:
                closed.add(entry.entry_id)
        return [f for f in self.findings() if f.entry_id not in closed]

    def open_critical(self) -> list[LogEntry]:
        return [f for f in self.open_findings() if f.severity == "critical"]

    def next_finding_id(self) -> str:
        """The next free `F-NNN`, never reusing an id even after a resolution."""
        highest = 0
        for entry in self.entries:
            match = re.match(r"^F-(\d+)", entry.entry_id)
            if match:
                highest = max(highest, int(match.group(1)))
        return f"F-{highest + 1:03d}"


ENTRY_HEADING_RE = re.compile(r"^##\s+\[([^\]]+)\]\s*(.*)$")
FIELD_RE = re.compile(r"^-\s+([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$")


def parse_log(text: str, path: Path | None = None) -> VerificationLog:
    """Parse a sidecar log. Tolerant by design — humans write these by hand."""
    fm_text, body = split_frontmatter(text)
    target = ""
    created = ""
    if fm_text is not None:
        for line in fm_text.split("\n"):
            match = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):[ \t]*(.*)$", line)
            if not match:
                continue
            value = _parse_scalar(match.group(2))
            if match.group(1) == "target":
                target = str(value or "")
            elif match.group(1) == "created":
                created = str(value or "")

    entries: list[LogEntry] = []
    current: LogEntry | None = None
    current_lines: list[str] = []
    last_field: str | None = None

    def flush() -> None:
        nonlocal current, current_lines, last_field
        if current is not None:
            current.raw = "\n".join(current_lines).rstrip()
            entries.append(current)
        current, current_lines, last_field = None, [], None

    for line in body.split("\n"):
        heading = ENTRY_HEADING_RE.match(line)
        if heading:
            flush()
            current = LogEntry(entry_id=heading.group(1).strip(), title=heading.group(2).strip())
            current_lines = [line]
            continue
        if current is None:
            continue
        current_lines.append(line)
        field_match = FIELD_RE.match(line)
        if field_match:
            last_field = field_match.group(1)
            current.fields[last_field] = field_match.group(2).strip()
        elif last_field and line[:1] in (" ", "\t") and line.strip():
            # A wrapped value: `evidence:` prose routinely runs to several lines.
            current.fields[last_field] = f"{current.fields[last_field]} {line.strip()}".strip()
        elif not line.strip():
            last_field = None

    flush()
    return VerificationLog(path=path or Path(""), target=target, created=created, entries=entries)


def read_log(content_rel: str, root: Path | None = None) -> VerificationLog | None:
    path = log_path_for(content_rel, root)
    if not path.is_file():
        return None
    return parse_log(path.read_text(encoding="utf-8"), path)


def new_log_text(content_rel: str, created: str | None = None) -> str:
    created = created or date.today().isoformat()
    return f"---\ntarget: {content_rel}\ncreated: {created}\n---\n"


def render_entry(
    entry_id: str,
    title: str,
    fields: Iterable[tuple[str, str]],
) -> str:
    """Render one entry. Multi-line values are indented so they parse back."""
    lines = [f"## [{entry_id}] {title}".rstrip()]
    for key, value in fields:
        if value is None:
            continue
        text = str(value).strip()
        if not text:
            continue
        parts = text.split("\n")
        lines.append(f"- {key}: {parts[0]}")
        lines.extend(f"  {p.strip()}" for p in parts[1:] if p.strip())
    return "\n".join(lines)


def append_entry(content_rel: str, entry_text: str, root: Path | None = None) -> Path:
    """Append one entry to a sidecar log, creating the file if needed.

    This is the *only* supported way to write a log (P3). It never reads back and
    rewrites earlier entries, so a concurrent hand-edit above cannot be clobbered.
    """
    path = log_path_for(content_rel, root)
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_file():
        existing = path.read_text(encoding="utf-8").rstrip("\n")
        path.write_text(f"{existing}\n\n{entry_text.rstrip()}\n", encoding="utf-8")
    else:
        path.write_text(f"{new_log_text(content_rel)}\n{entry_text.rstrip()}\n", encoding="utf-8")
    return path
