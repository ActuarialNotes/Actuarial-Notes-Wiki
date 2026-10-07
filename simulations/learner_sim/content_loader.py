"""The filtered content loader: everything the learner may see, and nothing else.

Two kinds of thing reach the learner, and both are built here:

* `LearnerPage` — a study page (the exam page, a concept page, one of this
  exam's tip pages or the general guide), with its frontmatter, comments and
  images removed and every `[[link]]` labelled as followable, broken, or "a
  reading you don't have". Resource pages, question files, comprehension checks
  and `.verify/` logs are not pages the learner can open.
* `LearnerQuestion` — built field by field from an allowlist (stem, options,
  part labels and stems, points, sitting). It has no field an answer key or a
  solution could ride in; `ALLOWED_QUESTION_FIELDS` is what the isolation test
  holds it to.

Traits the profile sets are enforced here rather than left to the prompt: a
skim collapses folded callouts (worked examples, objective lists) and keeps
only first sentences; low patience cuts long derivations short.
"""

from __future__ import annotations

import math
import os
import re
from dataclasses import dataclass, fields

from vault_links import Vault, canonical_page, iter_links, link_basename, load_aliases

from . import REPO_ROOT
from .exams import ExamSpec
from .textmatch import shingles, tokens, word_count
from .vault_parse import RawQuestion, split_frontmatter

# ── what the learner gets ──────────────────────────────────────────────────


@dataclass(frozen=True)
class LinkStatus:
    target: str
    status: str                 # ok | case | missing | unavailable
    resolved: str | None        # page title it opens, when it opens one


@dataclass(frozen=True)
class LearnerPage:
    title: str
    kind: str                   # exam | concept | guide
    mode: str                   # full | skim
    text: str
    links: tuple[LinkStatus, ...]
    words: int
    formulas: int
    truncated_derivations: int


@dataclass(frozen=True)
class LearnerPart:
    label: str
    points: float
    stem: str
    option_keys: tuple[str, ...]

    @property
    def response(self) -> str:
        return "choice" if self.option_keys else "written"


@dataclass(frozen=True)
class LearnerQuestion:
    qid: str                    # run-local id (Q1, Q2 …) — not the vault id
    exam_title: str
    sitting: str | None
    points: float
    kind: str                   # multiple-choice | written | multi-part
    stem: str
    option_keys: tuple[str, ...]
    parts: tuple[LearnerPart, ...]
    has_figure: bool

    def render(self) -> str:
        head = f"Question {self.qid} — {self.exam_title}"
        if self.sitting:
            head += f", {self.sitting} sitting"
        if self.points:
            head += f", {self.points:g} point{'s' if self.points != 1 else ''}"
        out = [head, "", self.stem]
        for p in self.parts:
            pts = f" ({p.points:g} points)" if p.points else ""
            out += ["", f"Part {p.label}{pts}", p.stem]
        out.append("")
        if self.kind == "multiple-choice":
            out.append(f"Answer with one letter: {', '.join(self.option_keys)}.")
        elif self.kind == "written":
            out.append("Write your answer as you would on the exam (a single written answer).")
        else:
            fmt = ", ".join(f'"{p.label}": ' + ("a letter" if p.option_keys else "your written answer")
                            for p in self.parts)
            out.append(f"Answer every part, as an object: {{{fmt}}}.")
        return "\n".join(out).strip()


ALLOWED_QUESTION_FIELDS = {f.name for f in fields(LearnerQuestion)}
ALLOWED_PART_FIELDS = {f.name for f in fields(LearnerPart)}

# ── rendering ──────────────────────────────────────────────────────────────

EMBED_RE = re.compile(r"!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]")
MD_IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
CALLOUT_RE = re.compile(r"^((?:>\s*)+)\[!(\w+)\]([-+]?)\s*(.*)$")


def _depth(line: str) -> int:
    m = re.match(r"^((?:>\s*)+)", line)
    return m.group(1).count(">") if m else 0


def _figure(name: str) -> str:
    base = os.path.splitext(name.split("/")[-1])[0].replace("_", " ")
    return f"[figure: {base} — images are not shown to you]"


def scrub(md: str) -> str:
    """Remove what a reader of the rendered page never sees, and images."""
    _, body = split_frontmatter(md)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    body = re.sub(r"%%.*?%%", "", body, flags=re.S)
    body = EMBED_RE.sub(lambda m: _figure(m.group(1)), body)
    body = MD_IMAGE_RE.sub(lambda m: _figure(m.group(2)), body)
    return re.sub(r"\n{3,}", "\n\n", body).strip()


def truncate_derivations(text: str, max_lines: int) -> tuple[str, int]:
    """Cut multi-line display maths longer than `max_lines` to its first lines."""
    out: list[str] = []
    lines = text.split("\n")
    i = 0
    cut = 0
    while i < len(lines):
        line = lines[i]
        prefix = re.match(r"^((?:>\s*)*)", line).group(1)
        inner = line[len(prefix):].strip()
        if inner.startswith("$$") and inner.count("$$") == 1:
            j = i + 1
            while j < len(lines) and "$$" not in lines[j]:
                j += 1
            block = lines[i:j + 1]
            if len(block) > max_lines:
                keep = max(2, max_lines - 1)
                out += block[:keep]
                out.append(f"{prefix}[… {len(block) - keep - 1} more lines of derivation you didn't work through …]")
                out.append(block[-1])
                cut += 1
            else:
                out += block
            i = j + 1
            continue
        out.append(line)
        i += 1
    return "\n".join(out), cut


def _first_sentence(line: str) -> str:
    in_math = False
    for k, ch in enumerate(line):
        if ch == "$":
            in_math = not in_math
        elif ch in ".!?" and not in_math and (k + 1 == len(line) or line[k + 1] == " ") and k > 20:
            return line[:k + 1] + (" …" if k + 1 < len(line.rstrip()) else "")
    return line


def skim(text: str) -> str:
    """What a skimmer takes in: headings, first sentences, formulas, callout titles."""
    out: list[str] = []
    lines = text.split("\n")
    i = 0
    prev_para = False
    while i < len(lines):
        line = lines[i]
        cm = CALLOUT_RE.match(line)
        if cm and cm.group(3) == "-":
            depth = cm.group(1).count(">")
            title = cm.group(4).strip() or cm.group(2)
            prefix = "> " * (depth - 1)
            out.append(f"{prefix}[{cm.group(2)}, folded — you didn't open it: {title}]")
            i += 1
            while i < len(lines) and _depth(lines[i]) >= depth:
                i += 1
            prev_para = False
            continue
        s = line.strip()
        bare = re.sub(r"^(>\s*)+", "", s)
        if not s:
            out.append(line)
            prev_para = False
        elif bare.startswith("#") or bare.startswith("$$") or bare.startswith("[figure"):
            out.append(line)
            prev_para = False
        elif bare.startswith("|"):
            rows = 0
            while i < len(lines) and re.sub(r"^(>\s*)+", "", lines[i].strip()).startswith("|"):
                if rows < 2:
                    out.append(lines[i])
                rows += 1
                i += 1
            if rows > 2:
                out.append(f"[… table continues, {rows - 2} more rows …]")
            prev_para = False
            continue
        elif re.match(r"^(\s{2,}|\t)[-*\d]", line):
            pass  # nested bullets skipped
        elif re.match(r"^[-*]|\d+\.", bare):
            out.append(_first_sentence(line))
            prev_para = False
        else:
            if not prev_para:
                out.append(_first_sentence(line))
            prev_para = True
        i += 1
    return re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip()


def count_formulas(text: str) -> int:
    display = len(re.findall(r"\$\$", text)) // 2
    inline = len(re.findall(r"(?<!\$)\$(?!\$)", re.sub(r"\$\$.*?\$\$", "", text, flags=re.S))) // 2
    return display + inline


def derivation_limit(patience: float) -> int:
    return 3 + round(max(0.0, min(1.0, patience)) * 12)


# ── the loader ─────────────────────────────────────────────────────────────


class ContentLoader:
    """Reads the vault for the learner. Only allowlisted paths are ever opened."""

    def __init__(self, exam: ExamSpec, root: str = REPO_ROOT):
        self.exam = exam
        self.root = root
        self.vault = Vault(root)
        self.aliases = load_aliases()
        self.pages: dict[str, tuple[str, str]] = {}   # title → (rel path, kind)
        for rel in sorted(os.listdir(root)):
            if rel.startswith("Exam ") and rel.endswith(".md"):
                self.pages[rel[:-3]] = (rel, "exam")
        for fn in sorted(os.listdir(os.path.join(root, "Concepts"))):
            if fn.endswith(".md"):
                self.pages.setdefault(fn[:-3], (f"Concepts/{fn}", "concept"))
        guides = os.path.join(root, "Guides")
        for fn in sorted(os.listdir(guides)):
            if fn.endswith(".md"):
                self.pages.setdefault(fn[:-3], (f"Guides/{fn}", "guide"))
        if exam.guides_dir:
            for fn in sorted(os.listdir(os.path.join(root, exam.guides_dir))):
                if fn.endswith(".md"):
                    self.pages.setdefault(fn[:-3], (f"{exam.guides_dir}/{fn}", "guide"))
        self._lower = {t.lower(): t for t in self.pages}
        self._raw_cache: dict[str, str] = {}
        self._search_index: dict[str, tuple[set[str], dict[str, int]]] | None = None
        self._overlap_index: dict[tuple[str, ...], str] | None = None

    # pages ------------------------------------------------------------------

    def _read(self, title: str) -> str:
        if title not in self._raw_cache:
            rel, _ = self.pages[title]
            with open(os.path.join(self.root, rel), encoding="utf-8") as fh:
                self._raw_cache[title] = fh.read()
        return self._raw_cache[title]

    def source(self, title: str) -> str:
        """A study page's markdown as stored (for trusted analysis, not the learner)."""
        return self._read(title)

    def resolve_title(self, requested: str) -> str | None:
        """The page a requested title opens: exact, case-folded, then alias."""
        req = requested.strip().strip("[]").split("#")[0].strip()
        if "/" in req:
            folder = req.rsplit("/", 1)[0].strip("/")
            if folder not in ("Concepts", "Guides", self.exam.guides_dir or "Guides"):
                return None
        name = link_basename(req)
        if name in self.pages:
            return name
        if name.lower() in self._lower:
            return self._lower[name.lower()]
        canon = canonical_page(name, self.vault, self.exam.wiki_id, self.aliases)
        if canon and canon in self.pages:
            return canon
        if name.lower() in {"syllabus", "exam", "exam page", self.exam.key.lower()}:
            return self.exam.title
        return None

    def link_status(self, target: str) -> LinkStatus:
        name = link_basename(target)
        if name in self.pages:
            return LinkStatus(target, "ok", name)
        if name.lower() in self._lower:
            return LinkStatus(target, "case", self._lower[name.lower()])
        state, path = self.vault.resolve(target)
        if state != "missing":
            return LinkStatus(target, "unavailable", None)
        return LinkStatus(target, "missing", None)

    def page(self, requested: str, mode: str = "full", patience: float = 1.0) -> LearnerPage | None:
        title = self.resolve_title(requested)
        if title is None:
            return None
        _, kind = self.pages[title]
        text = scrub(self._read(title))
        cut = 0
        if mode == "skim":
            text = skim(text)
        else:
            text, cut = truncate_derivations(text, derivation_limit(patience))
        seen: dict[str, LinkStatus] = {}
        for link in iter_links(text):
            if link.name not in seen:
                seen[link.name] = self.link_status(link.target)
        return LearnerPage(title=title, kind=kind, mode=mode, text=text, links=tuple(seen.values()),
                           words=word_count(text), formulas=count_formulas(text), truncated_derivations=cut)

    def syllabus(self) -> str:
        """The exam page's objectives, weights and the concepts each names."""
        text = scrub(self._read(self.exam.title))
        out = [f"{self.exam.title} — learning objectives (from the exam page)"]
        lines = text.split("\n")
        i = 0
        n = 0
        while i < len(lines):
            m = CALLOUT_RE.match(lines[i])
            if m and m.group(2).lower() == "example" and m.group(1).count(">") == 1:
                n += 1
                title = m.group(4).strip()
                i += 1
                block = []
                while i < len(lines) and _depth(lines[i]) >= 1:
                    block.append(lines[i])
                    i += 1
                names: list[str] = []
                for link in iter_links("\n".join(block)):
                    st = self.link_status(link.target)
                    if st.resolved and self.pages[st.resolved][1] == "concept" and st.resolved not in names:
                        names.append(st.resolved)
                out.append(f"{n}. {title}: " + (", ".join(names) if names else "(no concept pages linked)"))
                continue
            i += 1
        if self.exam.guides_dir:
            tips = sorted(t for t, (rel, k) in self.pages.items() if rel.startswith(self.exam.guides_dir + "/"))
            out.append("Study tips for this exam: " + ", ".join(tips))
        return "\n".join(out)

    def search(self, query: str, k: int = 8) -> list[tuple[str, str]]:
        if self._search_index is None:
            self._search_index = {}
            for title in self.pages:
                body = tokens(scrub(self._read(title)))
                tf: dict[str, int] = {}
                for t in body:
                    tf[t] = tf.get(t, 0) + 1
                self._search_index[title] = (set(tokens(title)), tf)
        q = [t for t in tokens(query) if len(t) > 1]
        if not q:
            return []
        scored = []
        for title, (tt, tf) in self._search_index.items():
            s = sum(5.0 for t in q if t in tt) + sum(math.log1p(tf.get(t, 0)) for t in q)
            if s > 0:
                scored.append((s, title))
        scored.sort(key=lambda x: (-x[0], x[1]))
        out = []
        for _, title in scored[:k]:
            snippet = ""
            for line in scrub(self._read(title)).split("\n"):
                low = line.lower()
                if any(t in low for t in q) and len(line.strip()) > 20:
                    snippet = line.strip()[:200]
                    break
            out.append((title, snippet))
        return out

    def allowed_texts(self) -> dict[str, str]:
        """Every page the learner could ever be shown, as shown in full."""
        return {t: scrub(self._read(t)) for t in self.pages}

    # questions --------------------------------------------------------------

    def learner_question(self, raw: RawQuestion, qid: str) -> LearnerQuestion:
        """Copy the allowlisted fields of a question; nothing else crosses."""
        parts = tuple(LearnerPart(label=p.label, points=p.points, stem=scrub(p.stem), option_keys=p.option_keys)
                      for p in raw.parts)
        if raw.type == "multiple-choice":
            kind = "multiple-choice"
        elif parts:
            kind = "multi-part"
        else:
            kind = "written"
        stems = [raw.stem] + [p.stem for p in raw.parts]
        has_figure = any(EMBED_RE.search(s) or MD_IMAGE_RE.search(s) for s in stems)
        return LearnerQuestion(
            qid=qid, exam_title=self.exam.title, sitting=raw.sitting, points=raw.points, kind=kind,
            stem=scrub(raw.stem), option_keys=raw.option_keys if kind == "multiple-choice" else (),
            parts=parts, has_figure=bool(has_figure),
        )

    def guide_overlap(self, stem: str, threshold: float = 0.35) -> str | None:
        """The study page a question stem is reproduced on, if any (a worked
        example lifted from the bank): the learner may have seen it solved."""
        if self._overlap_index is None:
            self._overlap_index = {}
            for title, (rel, kind) in self.pages.items():
                if kind == "concept":
                    for sh in shingles(scrub(self._read(title)), 6):
                        self._overlap_index.setdefault(sh, title)
        sh = shingles(scrub(stem), 6)
        if len(sh) < 6:
            return None
        hits: dict[str, int] = {}
        for s in sh:
            t = self._overlap_index.get(s)
            if t:
                hits[t] = hits.get(t, 0) + 1
        if not hits:
            return None
        title, n = max(hits.items(), key=lambda kv: kv[1])
        return title if n / len(sh) >= threshold else None

    def reachable_from_exam(self, depth: int = 2) -> dict[str, int]:
        """Concept pages within `depth` links of the exam page, with their distance."""
        dist = {self.exam.title: 0}
        frontier = [self.exam.title]
        for d in range(1, depth + 1):
            nxt = []
            for title in frontier:
                for link in iter_links(scrub(self._read(title))):
                    st = self.link_status(link.target)
                    if st.resolved and st.resolved not in dist:
                        dist[st.resolved] = d
                        nxt.append(st.resolved)
            frontier = nxt
        return dist
