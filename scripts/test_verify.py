#!/usr/bin/env python3
"""
test_verify.py — tests for the VERIFY validation layer.

Standard library `unittest` so CI needs no dependencies:

    python3 -m unittest discover -s scripts -p 'test_*.py' -v

The cases here are the spec's acceptance criteria, not incidental coverage:
editing a verified file downgrades it to stale; editing or deleting a log entry
fails CI; nothing reaches `verified` on model reasoning alone; a hand-written
human comment survives into the agent's context verbatim; and a repeated sweep
produces no duplicate findings.
"""

from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_check as C  # noqa: E402
import verify_lib as V  # noqa: E402

CONCEPT = """The **Loss Development Factor** is a ratio.

> $$LDF = \\frac{C_{n}}{C_{n-1}}$$
"""

QUESTION = """---
id: "cas5-2019f-q17"
exam: "Exam 5"
topic: "Ratemaking"
difficulty: medium
type: multiple-choice
answer: "B"
---

Earned premium is 3,850,000. What is the loss ratio?

- A) 0.568
- B) 0.62
"""


def verified_block(text: str, rel: str, date: str = "2026-08-19") -> dict:
    block = V.new_block(text, V.log_rel_for(rel))
    block.update(
        status="verified",
        confidence="high",
        last_checked=date,
        last_checked_by="agent:validate-v1",
        sources=["CAS Exam 5 Fall 2019 Q17 — official solution PDF, p.4"],
    )
    return block


class TempVault(unittest.TestCase):
    """A throwaway git repo with a real vault layout, so the CI checks can run."""

    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.addCleanup(self._tmp.cleanup)
        # verify_lib resolves paths against the module-level REPO_ROOT.
        self._saved = (V.REPO_ROOT, V.VERIFY_DIR, C.REPO_ROOT)
        V.REPO_ROOT, V.VERIFY_DIR, C.REPO_ROOT = self.root, self.root / ".verify", self.root
        self.addCleanup(self._restore)
        (self.root / "Concepts").mkdir()
        (self.root / "questions" / "exam-5").mkdir(parents=True)

    def _restore(self) -> None:
        V.REPO_ROOT, V.VERIFY_DIR, C.REPO_ROOT = self._saved

    def git(self, *args: str) -> str:
        return subprocess.run(
            ["git", *args], cwd=self.root, capture_output=True, text=True, check=True
        ).stdout

    def init_git(self) -> None:
        self.git("init", "-q", "-b", "main")
        self.git("config", "user.email", "test@example.com")
        self.git("config", "user.name", "test")

    def commit(self, message: str) -> None:
        self.git("add", "-A")
        self.git("commit", "-q", "-m", message)

    def write(self, rel: str, text: str) -> Path:
        path = self.root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
        return path

    def errors(self, rel: str) -> list[str]:
        text = (self.root / rel).read_text(encoding="utf-8")
        return [p.message for p in C.check_block(rel, text) if p.level == "error"]

    def warnings(self, rel: str) -> list[str]:
        text = (self.root / rel).read_text(encoding="utf-8")
        return [p.message for p in C.check_block(rel, text) if p.level == "warning"]


# ─── Hashing and the stale downgrade (P4) ─────────────────────────────────────

class ContentHashTests(TempVault):
    def test_writing_the_block_does_not_change_the_hash(self) -> None:
        """Backfilling must not invalidate the very thing it records."""
        before = V.content_hash(CONCEPT)
        block = V.new_block(CONCEPT, ".verify/Concepts/LDF.md")
        after = V.upsert_verification(CONCEPT, block)
        self.assertEqual(before, V.content_hash(after))
        self.assertEqual(block["content_hash"], before)

    def test_hash_ignores_whitespace_only_churn(self) -> None:
        reformatted = CONCEPT.replace("\n", "  \n").replace("\r\n", "\n")
        self.assertEqual(V.content_hash(CONCEPT), V.content_hash(reformatted))

    def test_hash_covers_non_verification_frontmatter(self) -> None:
        """A question's `answer:` lives in frontmatter and is exactly what a
        verification pass checks, so changing it must invalidate the pass."""
        edited = QUESTION.replace('answer: "B"', 'answer: "A"')
        self.assertNotEqual(V.content_hash(QUESTION), V.content_hash(edited))

    def test_editing_a_verified_file_downgrades_it_to_stale(self) -> None:
        rel = "Concepts/LDF.md"
        self.write(rel, V.upsert_verification(CONCEPT, verified_block(CONCEPT, rel)))
        V.append_entry(rel, V.render_entry("F-001", "Clean pass", [
            ("entry_type", "comment"), ("author", "agent:validate-v1"),
            ("date", "2026-08-19"), ("status", "resolved"),
        ]), self.root)
        C.sync_file(self.root / rel)
        self.assertEqual(V.parse_verification((self.root / rel).read_text())["status"], "verified")

        # A student-visible edit to the body.
        current = (self.root / rel).read_text(encoding="utf-8")
        self.write(rel, current.replace("is a ratio", "is a factor"))

        changed = C.sync_file(self.root / rel)
        self.assertIn("stale", changed)
        block = V.parse_verification((self.root / rel).read_text())
        self.assertEqual(block["status"], "stale")
        self.assertIsNone(block["confidence"], "a stale page must not keep a confidence")
        self.assertEqual(block["content_hash"], V.content_hash((self.root / rel).read_text()))

    def test_sync_is_idempotent(self) -> None:
        rel = "Concepts/LDF.md"
        self.write(rel, CONCEPT)
        self.assertIsNotNone(C.sync_file(self.root / rel))
        self.assertIsNone(C.sync_file(self.root / rel), "a second sync must be a no-op")

    def test_sync_never_raises_a_status(self) -> None:
        """P1, mechanically: no code path here can mark anything verified."""
        rel = "Concepts/LDF.md"
        self.write(rel, CONCEPT)
        C.sync_file(self.root / rel)
        for _ in range(3):
            C.sync_file(self.root / rel)
        self.assertEqual(V.parse_verification((self.root / rel).read_text())["status"], "unverified")

    def test_disputed_survives_an_edit(self) -> None:
        """A dispute is an unresolved conflict a human still has to settle;
        collapsing it into `stale` would hide the one status that means
        "we know something here is wrong"."""
        rel = "Concepts/LDF.md"
        block = verified_block(CONCEPT, rel) | {"status": "disputed", "confidence": None}
        self.write(rel, V.upsert_verification(CONCEPT, block))
        current = (self.root / rel).read_text(encoding="utf-8")
        self.write(rel, current.replace("is a ratio", "is a factor"))
        C.sync_file(self.root / rel)
        self.assertEqual(V.parse_verification((self.root / rel).read_text())["status"], "disputed")


# ─── Block schema enforcement ─────────────────────────────────────────────────

class BlockCheckTests(TempVault):
    def _write_verified(self, rel: str = "Concepts/LDF.md", **overrides) -> str:
        block = verified_block(CONCEPT, rel) | overrides
        self.write(rel, V.upsert_verification(CONCEPT, block))
        V.append_entry(rel, V.render_entry("F-001", "Checked against the source", [
            ("entry_type", "comment"), ("author", "agent:validate-v1"),
            ("date", "2026-08-19"),
        ]), self.root)
        return rel

    def test_a_clean_verified_page_passes(self) -> None:
        rel = self._write_verified()
        self.assertEqual(self.errors(rel), [])

    def test_verified_with_no_source_fails(self) -> None:
        """P1: an AI cannot verify by reasoning alone."""
        rel = self._write_verified(sources=[])
        self.assertTrue(any("citable source" in e for e in self.errors(rel)))

    def test_verified_with_no_confidence_fails(self) -> None:
        rel = self._write_verified(confidence=None)
        self.assertTrue(any("requires a confidence" in e for e in self.errors(rel)))

    def test_verified_with_no_same_day_log_entry_fails(self) -> None:
        rel = "Concepts/LDF.md"
        self.write(rel, V.upsert_verification(CONCEPT, verified_block(CONCEPT, rel)))
        self.assertTrue(any("requires a log entry" in e for e in self.errors(rel)))

        V.append_entry(rel, V.render_entry("F-001", "Checked", [
            ("entry_type", "comment"), ("author", "agent:validate-v1"),
            ("date", "2026-01-01"),
        ]), self.root)
        self.assertTrue(any("dated 2026-08-19" in e for e in self.errors(rel)))

    def test_confidence_on_an_unverified_page_fails(self) -> None:
        rel = "Concepts/LDF.md"
        block = V.new_block(CONCEPT, V.log_rel_for(rel)) | {"confidence": "high"}
        self.write(rel, V.upsert_verification(CONCEPT, block))
        self.assertTrue(any("only meaningful on a verified page" in e for e in self.errors(rel)))

    def test_missing_block_fails(self) -> None:
        self.write("Concepts/LDF.md", CONCEPT)
        self.assertTrue(any("missing verification block" in e for e in self.errors("Concepts/LDF.md")))

    def test_malformed_block_fails_rather_than_reading_as_unverified(self) -> None:
        self.write("Concepts/LDF.md", "---\nverification:\n  status = verified\n---\n\nbody\n")
        self.assertTrue(any("unparseable" in e for e in self.errors("Concepts/LDF.md")))

    def test_wrong_log_path_fails(self) -> None:
        rel = "Concepts/LDF.md"
        block = V.new_block(CONCEPT, ".verify/somewhere/else.md")
        self.write(rel, V.upsert_verification(CONCEPT, block))
        self.assertTrue(any("log must be" in e for e in self.errors(rel)))

    def test_hash_mismatch_warns_but_does_not_fail(self) -> None:
        """A content-only PR must never be blocked by the record; `--sync`
        repairs it instead."""
        rel = self._write_verified()
        current = (self.root / rel).read_text(encoding="utf-8")
        self.write(rel, current.replace("is a ratio", "is a factor"))
        self.assertEqual(self.errors(rel), [])
        self.assertTrue(any("no longer matches" in w for w in self.warnings(rel)))


# ─── Logs ─────────────────────────────────────────────────────────────────────

class LogTests(TempVault):
    FINDING = """## [F-001] Stem value contradicts official PDF
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-08-19T14:02Z/a3f9
- date: 2026-08-19
- severity: critical
- status: open
- locus: stem, line 12
- claim: Stem gives earned premium of 4,200,000.
- evidence: CAS Exam 5 Fall 2019 Q17 official PDF p.4 states 4,200,000 for *written*
  premium and 3,850,000 for earned. Recomputing the LR with 3,850,000 reproduces the
  stated answer of 0.62.
- proposed_action: Change earned premium to 3,850,000.
- applied: false
"""

    RESOLUTION = """## [F-001/R] Correction applied
- entry_type: resolution
- author: human:jordan
- date: 2026-08-20
- resolves: F-001
- status: resolved
- note: Confirmed against the PDF, fixed in commit 8ac31f2.
"""

    def test_parses_the_spec_example(self) -> None:
        log = V.parse_log(V.new_log_text("questions/exam-5/q.md") + "\n" + self.FINDING)
        self.assertEqual(len(log.entries), 1)
        entry = log.entries[0]
        self.assertEqual(entry.entry_id, "F-001")
        self.assertEqual(entry.severity, "critical")
        self.assertEqual(entry.status, "open")
        self.assertEqual(entry.title, "Stem value contradicts official PDF")
        self.assertIn("3,850,000 for earned", entry.fields["evidence"])
        self.assertIn("reproduces the stated answer", entry.fields["evidence"])
        self.assertEqual(len(log.open_findings()), 1)
        self.assertEqual(len(log.open_critical()), 1)

    def test_a_resolution_closes_the_finding_it_references(self) -> None:
        text = V.new_log_text("questions/exam-5/q.md") + "\n" + self.FINDING + "\n" + self.RESOLUTION
        log = V.parse_log(text)
        self.assertEqual(len(log.entries), 2)
        self.assertEqual(log.open_findings(), [])
        self.assertEqual(log.open_critical(), [])

    def test_finding_ids_are_never_reused(self) -> None:
        text = V.new_log_text("questions/exam-5/q.md") + "\n" + self.FINDING + "\n" + self.RESOLUTION
        self.assertEqual(V.parse_log(text).next_finding_id(), "F-002")

    def test_append_entry_only_ever_adds(self) -> None:
        rel = "questions/exam-5/q.md"
        V.append_entry(rel, self.FINDING.strip(), self.root)
        first = V.log_path_for(rel, self.root).read_text(encoding="utf-8")
        V.append_entry(rel, self.RESOLUTION.strip(), self.root)
        second = V.log_path_for(rel, self.root).read_text(encoding="utf-8")
        self.assertTrue(second.startswith(first.rstrip("\n")))

    def test_a_hand_written_human_comment_is_preserved_verbatim(self) -> None:
        """The compounding mechanism: whatever a human types into a log by hand
        has to reach the next sweep's context word for word."""
        rel = "questions/exam-5/q.md"
        V.append_entry(rel, self.FINDING.strip(), self.root)
        hand_written = (
            "## [C-001] The 2019 paper reuses this exhibit\n"
            "- entry_type: comment\n"
            "- author: human:jordan\n"
            "- date: 2026-08-21\n"
            "- note: Q14 on the same paper reuses this exhibit — if the premium is wrong\n"
            "  here it is wrong there too. Check both before closing F-001.\n"
        )
        path = V.log_path_for(rel, self.root)
        path.write_text(path.read_text(encoding="utf-8").rstrip("\n") + "\n\n" + hand_written, encoding="utf-8")

        log = V.parse_log(path.read_text(encoding="utf-8"), path)
        comment = next(e for e in log.entries if e.entry_id == "C-001")
        self.assertEqual(comment.author, "human:jordan")
        self.assertEqual(comment.entry_type, "comment")
        self.assertIn("Q14 on the same paper reuses this exhibit", comment.fields["note"])
        self.assertIn("Check both before closing F-001", comment.fields["note"])
        # And it survives into the raw text an agent is handed as context.
        self.assertIn(hand_written.strip(), path.read_text(encoding="utf-8"))

    def test_open_findings_counter_is_derived_from_the_log(self) -> None:
        rel = "questions/exam-5/q.md"
        self.write(rel, V.upsert_verification(QUESTION, V.new_block(QUESTION, V.log_rel_for(rel))))
        V.append_entry(rel, self.FINDING.strip(), self.root)
        C.sync_file(self.root / rel)
        self.assertEqual(V.parse_verification((self.root / rel).read_text())["open_findings"], 1)

        V.append_entry(rel, self.RESOLUTION.strip(), self.root)
        C.sync_file(self.root / rel)
        self.assertEqual(V.parse_verification((self.root / rel).read_text())["open_findings"], 0)

    def test_log_pointing_at_a_missing_target_fails(self) -> None:
        rel = "questions/exam-5/gone.md"
        V.append_entry(rel, self.FINDING.strip(), self.root)
        problems = C.check_log_file(V.log_path_for(rel, self.root))
        self.assertTrue(any("does not exist" in p.message for p in problems))

    def test_a_finding_with_no_severity_fails(self) -> None:
        rel = "questions/exam-5/q.md"
        self.write(rel, QUESTION)
        V.append_entry(rel, V.render_entry("F-001", "Something", [
            ("entry_type", "finding"), ("author", "agent:validate-v1"),
            ("date", "2026-08-19"), ("status", "open"),
        ]), self.root)
        problems = C.check_log_file(V.log_path_for(rel, self.root))
        self.assertTrue(any("severity" in p.message for p in problems))


# ─── Append-only enforcement (P3) ─────────────────────────────────────────────

class AppendOnlyTests(TempVault):
    ENTRY = """## [F-001] Stem value contradicts official PDF
- entry_type: finding
- author: agent:validate-v1
- date: 2026-08-19
- severity: critical
- status: open
"""

    def setUp(self) -> None:
        super().setUp()
        self.init_git()
        self.rel = "questions/exam-5/q.md"
        self.write(self.rel, QUESTION)
        V.append_entry(self.rel, self.ENTRY.strip(), self.root)
        self.commit("seed")
        self.log_file = V.log_path_for(self.rel, self.root)

    def test_appending_an_entry_passes(self) -> None:
        V.append_entry(self.rel, V.render_entry("F-001/R", "Correction applied", [
            ("entry_type", "resolution"), ("author", "human:jordan"),
            ("date", "2026-08-20"), ("resolves", "F-001"), ("status", "resolved"),
        ]), self.root)
        self.commit("append a resolution")
        self.assertEqual(C.check_append_only("HEAD~1"), [])

    def test_a_brand_new_log_passes(self) -> None:
        other = "questions/exam-5/q2.md"
        self.write(other, QUESTION)
        V.append_entry(other, self.ENTRY.strip(), self.root)
        self.commit("new log")
        self.assertEqual(C.check_append_only("HEAD~1"), [])

    def test_editing_an_existing_entry_fails(self) -> None:
        text = self.log_file.read_text(encoding="utf-8")
        self.log_file.write_text(text.replace("severity: critical", "severity: nit"), encoding="utf-8")
        self.commit("quietly downgrade a finding")
        problems = C.check_append_only("HEAD~1")
        self.assertTrue(problems)
        self.assertTrue(any("append-only" in p.message for p in problems))

    def test_deleting_an_entry_fails(self) -> None:
        text = self.log_file.read_text(encoding="utf-8")
        self.log_file.write_text(text.split("## [F-001]")[0], encoding="utf-8")
        self.commit("drop a finding")
        self.assertTrue(any("append-only" in p.message for p in C.check_append_only("HEAD~1")))

    def test_deleting_a_log_file_fails(self) -> None:
        self.log_file.unlink()
        self.commit("remove the log")
        self.assertTrue(any("deleted" in p.message for p in C.check_append_only("HEAD~1")))

    def test_extending_the_final_line_fails(self) -> None:
        """Appending must add lines, not rewrite the last one."""
        text = self.log_file.read_text(encoding="utf-8").rstrip("\n")
        self.log_file.write_text(text + " and also fine actually\n", encoding="utf-8")
        self.commit("extend the last line")
        self.assertTrue(any("append-only" in p.message for p in C.check_append_only("HEAD~1")))

    def test_a_trailing_newline_change_alone_is_not_a_violation(self) -> None:
        text = self.log_file.read_text(encoding="utf-8")
        self.log_file.write_text(text.rstrip("\n"), encoding="utf-8")
        self.commit("strip the trailing newline")
        self.assertEqual(C.check_append_only("HEAD~1"), [])


# ─── Frontmatter handling ─────────────────────────────────────────────────────

class FrontmatterTests(unittest.TestCase):
    def test_creates_frontmatter_on_a_page_that_has_none(self) -> None:
        out = V.upsert_verification(CONCEPT, V.new_block(CONCEPT, ".verify/Concepts/LDF.md"))
        self.assertTrue(out.startswith("---\nverification:\n"))
        self.assertIn("The **Loss Development Factor** is a ratio.", out)

    def test_appends_to_existing_frontmatter_without_disturbing_it(self) -> None:
        out = V.upsert_verification(QUESTION, V.new_block(QUESTION, ".verify/questions/exam-5/q.md"))
        self.assertIn('id: "cas5-2019f-q17"', out)
        self.assertIn('answer: "B"', out)
        self.assertLess(out.index('id: "cas5-2019f-q17"'), out.index("verification:"))
        self.assertIn("Earned premium is 3,850,000.", out)

    def test_rewriting_the_block_replaces_it_rather_than_stacking(self) -> None:
        once = V.upsert_verification(QUESTION, V.new_block(QUESTION, ".verify/questions/exam-5/q.md"))
        twice = V.upsert_verification(once, V.parse_verification(once))
        self.assertEqual(once, twice)
        self.assertEqual(twice.count("verification:"), 1)

    def test_body_containing_a_horizontal_rule_is_not_mistaken_for_frontmatter(self) -> None:
        body = "Some prose\n\n---\n\nMore prose\n"
        fm_text, rest = V.split_frontmatter(body)
        self.assertIsNone(fm_text)
        self.assertEqual(rest, body)

    def test_log_path_mirrors_the_vault_path(self) -> None:
        self.assertEqual(V.log_rel_for("questions/exam-5/q-2019-fall-17.md"),
                         ".verify/questions/exam-5/q-2019-fall-17.md")
        self.assertEqual(V.log_rel_for("Concepts/Loss Development Factor.md"),
                         ".verify/Concepts/Loss Development Factor.md")
        self.assertEqual(V.content_rel_for_log(".verify/Concepts/Loss Development Factor.md"),
                         "Concepts/Loss Development Factor.md")


if __name__ == "__main__":
    unittest.main(verbosity=2)
