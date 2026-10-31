"""Where a resource page lives — one table, read by every script that walks them.

A resource page (docs/resource-pages.md) describes one real document. They all
began in `Resources/Books/`, which is why that folder holds papers, ASOPs,
guidelines and statutes as well as books; those pages stay where they are, and
any `Type` is allowed there. A **new** page goes in the folder its `Type`
names:

    Books/        Textbook, Casebook, Monograph, Course, Syllabus, Guide,
                  Glossary, Reference Sheet
    Papers/       Paper, Study Note
    Reports/      Report
    Standards/    Standard of Practice, Accounting Standard, Statement of
                  Principles, Educational Note, Code of Conduct
    Regulation/   Guideline, Instructions, Regulatory Return, Legislation,
                  Case Law
    Data/         Dataset
    Benchmarks/   Benchmark

`Regulation/`, `Data/` and `Benchmarks/` also hold pages written to other
shapes — the Research tab's dated timeline entries (lower-case `id:` /
`type:` frontmatter) and the Actuarial Tools data pages (no frontmatter but
the `verification:` block). A page there is a resource page when its
frontmatter carries `Title:`; the rest are left to their own owners.
`Resources/Events/` holds timeline entries only.

The app keeps the same table in `quiz/src/lib/resourceFolders.ts`;
`test_resource_pages.py` holds the two equal. Stdlib only.
"""

from __future__ import annotations

import os
import re

BOOKS = "Resources/Books"

TYPE_FOLDER = {
    "Textbook": "Books",
    "Casebook": "Books",
    "Monograph": "Books",
    "Course": "Books",
    "Syllabus": "Books",
    "Guide": "Books",
    "Glossary": "Books",
    "Reference Sheet": "Books",
    "Paper": "Papers",
    "Study Note": "Papers",
    "Report": "Reports",
    "Standard of Practice": "Standards",
    "Accounting Standard": "Standards",
    "Statement of Principles": "Standards",
    "Educational Note": "Standards",
    "Code of Conduct": "Standards",
    "Guideline": "Regulation",
    "Instructions": "Regulation",
    "Regulatory Return": "Regulation",
    "Legislation": "Regulation",
    "Case Law": "Regulation",
    "Dataset": "Data",
    "Benchmark": "Benchmarks",
}

# Every folder a resource page may sit in, Books first.
FOLDERS = tuple(dict.fromkeys(["Books", *TYPE_FOLDER.values()]))

_TITLE_KEY = re.compile(r"^Title:", re.M)


def frontmatter(text: str) -> str:
    """The raw frontmatter block, or '' when the page has none."""
    if not text.startswith("---"):
        return ""
    end = text.find("\n---", 3)
    return text[3:end] if end > 0 else ""


def is_resource_page(rel: str, text: str) -> bool:
    """Whether `rel` (repo-relative) is a resource page in the standard's shape."""
    parts = rel.replace(os.sep, "/").split("/")
    if len(parts) != 3 or parts[0] != "Resources" or not parts[2].endswith(".md"):
        return False
    if parts[1] == "Books":
        return True
    return parts[1] in FOLDERS and bool(_TITLE_KEY.search(frontmatter(text)))


def folder_for_type(type_: str) -> str | None:
    """The folder a new page of this `Type` belongs in."""
    return TYPE_FOLDER.get(type_)


def resource_pages(root: str) -> list[str]:
    """Every resource page in the vault, repo-relative, sorted."""
    out: list[str] = []
    for folder in FOLDERS:
        base = os.path.join(root, "Resources", folder)
        if not os.path.isdir(base):
            continue
        for name in os.listdir(base):
            if not name.endswith(".md"):
                continue
            rel = f"Resources/{folder}/{name}"
            with open(os.path.join(base, name), encoding="utf-8") as fh:
                if is_resource_page(rel, fh.read()):
                    out.append(rel)
    return sorted(out)


def find_resource(root: str, name: str) -> str | None:
    """The repo path of the resource page called `name` (its filename, no .md)."""
    for folder in FOLDERS:
        rel = f"Resources/{folder}/{name}.md"
        path = os.path.join(root, rel)
        if os.path.isfile(path):
            with open(path, encoding="utf-8") as fh:
                if is_resource_page(rel, fh.read()):
                    return rel
    return None
