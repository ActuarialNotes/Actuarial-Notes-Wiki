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

def _git_diff_is_empty(root: Path, a: str, b: str) -> bool:
    out = subprocess.run(
        ["git", "diff", "--name-only", a, b, "--", ".verify"],
        cwd=root, capture_output=True, text=True, check=True,
    ).stdout.strip()
    return out == ""


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


    def test_a_log_created_and_then_tampered_within_one_pr_fails(self) -> None:
        """The net diff shows a log added in this PR as a plain "added" file, so
        a rewrite of an entry the same PR just filed is invisible to it. A sweep
        writes its own logs, so this is exactly the shape a sweep could produce."""
        other = "questions/exam-5/q2.md"
        self.write(other, QUESTION)
        V.append_entry(other, self.ENTRY.strip(), self.root)
        self.commit("sweep: file a critical finding")

        log_file = V.log_path_for(other, self.root)
        text = log_file.read_text(encoding="utf-8")
        log_file.write_text(text.replace("severity: critical", "severity: nit"), encoding="utf-8")
        self.commit("sweep: quietly downgrade it")

        problems = C.check_append_only("HEAD~2")
        self.assertTrue(problems, "a within-PR rewrite must still be caught")
        self.assertTrue(any("append-only" in p.message for p in problems))

    def test_an_edit_reverted_later_in_the_pr_still_fails(self) -> None:
        """Net-zero across the PR, but the entry was rewritten in between."""
        original = self.log_file.read_text(encoding="utf-8")
        self.log_file.write_text(original.replace("severity: critical", "severity: nit"),
                                 encoding="utf-8")
        self.commit("downgrade")
        self.log_file.write_text(original, encoding="utf-8")
        self.commit("put it back")

        self.assertEqual(_git_diff_is_empty(self.root, "HEAD~2", "HEAD"), True)
        problems = C.check_append_only("HEAD~2")
        self.assertTrue(any("append-only" in p.message for p in problems))

    def test_appending_across_several_commits_passes(self) -> None:
        V.append_entry(self.rel, V.render_entry("C-001", "Checked the sibling batch", [
            ("entry_type", "comment"), ("author", "agent:validate-v1"), ("date", "2026-08-19"),
        ]), self.root)
        self.commit("append a comment")
        V.append_entry(self.rel, V.render_entry("F-001/R", "Correction applied", [
            ("entry_type", "resolution"), ("author", "human:jordan"), ("date", "2026-08-20"),
            ("resolves", "F-001"), ("status", "resolved"),
        ]), self.root)
        self.commit("append a resolution")
        self.assertEqual(C.check_append_only("HEAD~2"), [])


# ─── Recording a pass (P1 + idempotency) ──────────────────────────────────────

class RecordTests(TempVault):
    """`verify_record.py` is where the spec's two hardest rules are made
    mechanical: nothing verifies on reasoning alone, and a repeated sweep
    reaffirms rather than duplicates."""

    def setUp(self) -> None:
        super().setUp()
        import verify_record

        self.R = verify_record
        self.rel = "questions/exam-5/q.md"
        self.write(self.rel, V.upsert_verification(QUESTION, V.new_block(QUESTION, V.log_rel_for(self.rel))))

    def record(self, command: str, *argv: str) -> int:
        saved = sys.argv
        sys.argv = ["verify_record.py", command, *argv]
        try:
            return self.R.main()
        finally:
            sys.argv = saved

    def finding(self, claim: str = "Stem gives earned premium of 4,200,000.", **kw) -> int:
        return self.record(
            "finding", self.rel,
            "--severity", kw.get("severity", "critical"),
            "--title", kw.get("title", "Stem value contradicts official PDF"),
            "--locus", kw.get("locus", "stem, line 12"),
            "--claim", claim,
            "--evidence", kw.get("evidence", "CAS Exam 5 Fall 2019 Q17 official PDF p.4 states 3,850,000."),
            "--date", kw.get("date", "2026-08-19"),
            *kw.get("extra", []),
        )

    def log(self) -> V.VerificationLog:
        return V.read_log(self.rel)

    def block(self) -> dict:
        return V.parse_verification((self.root / self.rel).read_text(encoding="utf-8"))

    # — idempotency —

    def test_a_finding_is_recorded_once(self) -> None:
        self.finding()
        self.assertEqual([e.entry_id for e in self.log().findings()], ["F-001"])
        self.assertEqual(self.block()["open_findings"], 1)

    def test_the_same_sweep_run_twice_produces_no_duplicate_findings(self) -> None:
        self.finding()
        self.finding()
        self.finding()
        log = self.log()
        self.assertEqual([e.entry_id for e in log.findings()], ["F-001"])
        self.assertEqual(len(log.open_findings()), 1)
        self.assertEqual(self.block()["open_findings"], 1)

    def test_a_later_sweep_reaffirms_rather_than_duplicating(self) -> None:
        self.finding(date="2026-08-19")
        self.finding(date="2026-08-26")
        log = self.log()
        self.assertEqual([e.entry_id for e in log.findings()], ["F-001"])
        reaffirm = [e for e in log.entries if e.fields.get("reaffirms") == "F-001"]
        self.assertEqual(len(reaffirm), 1)
        self.assertEqual(reaffirm[0].entry_date, "2026-08-26")
        self.assertEqual(reaffirm[0].entry_type, "comment")

    def test_rephrasing_the_same_finding_is_still_recognised(self) -> None:
        """The fingerprint normalises case, whitespace and punctuation, so a
        differently-worded re-detection of the same problem still matches."""
        self.finding("Stem gives earned premium of 4,200,000.")
        self.finding("stem gives earned premium of  4200000")
        self.assertEqual([e.entry_id for e in self.log().findings()], ["F-001"])

    def test_a_different_problem_gets_its_own_id(self) -> None:
        self.finding()
        self.finding("Option D duplicates option B.", locus="option D", severity="minor",
                     title="Duplicate distractor")
        self.assertEqual([e.entry_id for e in self.log().findings()], ["F-001", "F-002"])
        self.assertEqual(self.block()["open_findings"], 2)

    def test_a_regression_after_a_fix_gets_a_new_entry_naming_the_old_one(self) -> None:
        self.finding()
        self.record("resolution", self.rel, "--resolves", "F-001", "--author", "human:jordan",
                    "--note", "Fixed in commit 8ac31f2.", "--date", "2026-08-20")
        self.assertEqual(self.block()["open_findings"], 0)

        self.finding(date="2026-09-01")
        log = self.log()
        self.assertEqual([e.entry_id for e in log.findings()], ["F-001", "F-002"])
        self.assertEqual(log.entries[-1].fields["recurrence_of"], "F-001")
        self.assertEqual(self.block()["open_findings"], 1)

    def test_open_critical_tracks_severity_not_just_count(self) -> None:
        """The app excludes a question with an open *critical* finding from quiz
        sessions, and logs are not bundled — so severity has to ride in the
        block."""
        self.finding(severity="minor", locus="option D", claim="Option D duplicates B.",
                     title="Duplicate distractor")
        block = self.block()
        self.assertEqual(block["open_findings"], 1)
        self.assertEqual(block["open_critical"], 0)

        self.finding()  # the default fixture finding is critical
        block = self.block()
        self.assertEqual(block["open_findings"], 2)
        self.assertEqual(block["open_critical"], 1)

        self.record("resolution", self.rel, "--resolves", "F-002", "--author", "human:jordan",
                    "--note", "Fixed.", "--date", "2026-08-20")
        block = self.block()
        self.assertEqual(block["open_findings"], 1)
        self.assertEqual(block["open_critical"], 0)

    # — P1 —

    def test_verified_without_a_source_is_refused(self) -> None:
        with self.assertRaises(SystemExit) as caught:
            self.record("pass", self.rel, "--status", "verified", "--confidence", "high",
                        "--date", "2026-08-19")
        self.assertIn("requires at least one --source", str(caught.exception))
        self.assertEqual(self.block()["status"], "unverified")

    def test_verified_with_a_source_is_allowed_and_passes_ci(self) -> None:
        self.record("pass", self.rel, "--status", "verified", "--confidence", "high",
                    "--source", "CAS Exam 5 Fall 2019 Q17 — official solution PDF, p.4",
                    "--date", "2026-08-19")
        block = self.block()
        self.assertEqual(block["status"], "verified")
        self.assertEqual(block["confidence"], "high")
        self.assertEqual(len(block["sources"]), 1)
        self.assertEqual(self.errors(self.rel), [])

    def test_verified_over_an_open_critical_finding_is_refused(self) -> None:
        self.finding()
        with self.assertRaises(SystemExit) as caught:
            self.record("pass", self.rel, "--status", "verified", "--confidence", "high",
                        "--source", "CAS official PDF p.4", "--date", "2026-08-19")
        self.assertIn("open critical finding", str(caught.exception))
        self.assertNotEqual(self.block()["status"], "verified")

    def test_in_review_needs_no_source(self) -> None:
        self.record("pass", self.rel, "--status", "in_review", "--date", "2026-08-19")
        self.assertEqual(self.block()["status"], "in_review")
        self.assertEqual(self.errors(self.rel), [])

    def test_a_finding_can_set_the_page_to_disputed(self) -> None:
        self.finding(extra=["--set-status", "disputed"])
        block = self.block()
        self.assertEqual(block["status"], "disputed")
        self.assertIsNone(block["confidence"])
        self.assertEqual(self.errors(self.rel), [])

    def test_recording_a_pass_leaves_a_same_day_log_entry(self) -> None:
        """CI requires one; the recorder must always produce it."""
        self.record("pass", self.rel, "--status", "verified", "--confidence", "medium",
                    "--source", "SOA sample solutions (2024), Q17", "--date", "2026-08-19")
        dates = [e.entry_date for e in self.log().entries]
        self.assertIn("2026-08-19", dates)

    def test_every_write_is_an_append(self) -> None:
        """P3 by construction: the log only ever grows."""
        self.finding()
        snapshots = [V.log_path_for(self.rel, self.root).read_text(encoding="utf-8")]
        self.record("comment", self.rel, "--note", "Checked the sibling batch too.",
                    "--date", "2026-08-19")
        snapshots.append(V.log_path_for(self.rel, self.root).read_text(encoding="utf-8"))
        self.record("resolution", self.rel, "--resolves", "F-001", "--author", "human:jordan",
                    "--note", "Fixed.", "--date", "2026-08-20")
        snapshots.append(V.log_path_for(self.rel, self.root).read_text(encoding="utf-8"))
        for earlier, later in zip(snapshots, snapshots[1:]):
            self.assertTrue(later.startswith(earlier.rstrip("\n")))

    def test_the_recorded_log_passes_the_log_checks(self) -> None:
        self.finding()
        self.record("resolution", self.rel, "--resolves", "F-001", "--author", "human:jordan",
                    "--note", "Fixed in commit 8ac31f2.", "--date", "2026-08-20")
        problems = C.check_log_file(V.log_path_for(self.rel, self.root))
        self.assertEqual([p.message for p in problems], [])



# ─── Reader reports (Phase 3) ─────────────────────────────────────────────────

class ReaderReportTests(TempVault):
    """`sync_reports.py` is the bridge from an in-app report to the log the next
    sweep reads. The bridge is only worth anything if the reader's words arrive
    intact."""

    def setUp(self) -> None:
        super().setUp()
        import sync_reports

        self.S = sync_reports
        self.rel = "questions/exam-5/q.md"
        self.write(self.rel, V.upsert_verification(QUESTION, V.new_block(QUESTION, V.log_rel_for(self.rel))))

    def report(self, **kw) -> "object":
        defaults = dict(
            id="11111111-1111-1111-1111-111111111111",
            content_path=self.rel,
            reporter_name="Jordan T",
            locus="option C",
            body="The earned premium in the stem looks wrong.",
            severity="wrong answer",
            created_at="2026-08-22T10:00:00Z",
        )
        return self.S.Report(**(defaults | kw))

    def test_a_report_becomes_a_comment_entry_the_sweep_reads(self) -> None:
        self.S.append_report(self.report())
        log = self.log_for(self.rel)
        entry = log.entries[0]
        self.assertEqual(entry.entry_type, "comment")
        self.assertEqual(entry.author, "human:Jordan-T")
        self.assertEqual(entry.entry_date, "2026-08-22")
        self.assertIn("earned premium in the stem looks wrong", entry.fields["note"])
        self.assertEqual(entry.fields["locus"], "option C")

    def test_the_reporters_words_survive_verbatim(self) -> None:
        """Acceptance: a human comment appears verbatim in the agent's context."""
        words = "Q14 on the same paper reuses this exhibit — check both."
        self.S.append_report(self.report(body=words))
        raw = V.log_path_for(self.rel, self.root).read_text(encoding="utf-8")
        self.assertIn(words, raw)

    def test_a_multi_line_body_flattens_without_losing_anything(self) -> None:
        body = "First line.\n\n- a bullet\n- another bullet\n\nLast line."
        self.S.append_report(self.report(body=body))
        note = self.log_for(self.rel).entries[0].fields["note"]
        for fragment in ("First line.", "a bullet", "another bullet", "Last line."):
            self.assertIn(fragment, note)

    def test_an_anonymous_report_is_authored_anon(self) -> None:
        self.S.append_report(self.report(reporter_name=None))
        self.assertEqual(self.log_for(self.rel).entries[0].author, "human:anon")

    def test_contact_details_are_stripped_on_the_way_into_a_public_repo(self) -> None:
        self.S.append_report(self.report(body="Reach me at reader@example.com about this."))
        note = self.log_for(self.rel).entries[0].fields["note"]
        self.assertNotIn("reader@example.com", note)
        self.assertIn("[email removed]", note)

    def test_syncing_twice_does_not_double_file_a_report(self) -> None:
        self.S.append_report(self.report())
        self.S.append_report(self.report())
        self.assertEqual(len(self.log_for(self.rel).entries), 1)

    def test_a_report_bumps_the_pages_open_finding_count_by_nothing(self) -> None:
        """A reader report is a comment, not a finding. The agent triages it."""
        self.S.append_report(self.report())
        block = V.parse_verification((self.root / self.rel).read_text(encoding="utf-8"))
        self.assertEqual(block["open_findings"], 0)

    def test_a_report_against_a_path_outside_the_vault_is_skipped(self) -> None:
        self.assertIsNone(self.S.append_report(self.report(content_path="../../etc/passwd")))
        self.assertIsNone(self.S.append_report(self.report(content_path="quiz/src/App.tsx")))

    def test_the_resulting_log_passes_the_log_checks(self) -> None:
        self.S.append_report(self.report())
        problems = C.check_log_file(V.log_path_for(self.rel, self.root))
        self.assertEqual([p.message for p in problems], [])

    def log_for(self, rel: str) -> V.VerificationLog:
        return V.parse_log(V.log_path_for(rel, self.root).read_text(encoding="utf-8"))


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
