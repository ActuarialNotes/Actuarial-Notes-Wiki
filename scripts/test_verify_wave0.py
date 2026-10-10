#!/usr/bin/env python3
"""
test_verify_wave0.py — tests for the packet tooling of `docs/verification-plan.md`
(Wave 0): the source cache, the paper packet, the concept router, the batch
recorder and `verify_targets.py --by-source`.

Everything here is pure or runs on a throwaway vault: no network, no PyMuPDF,
no Tesseract — CI runs `unittest discover -s scripts` with the stdlib alone.

    python3 -m unittest scripts/test_verify_wave0.py -v
"""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_lib as V  # noqa: E402
import verify_paper as P  # noqa: E402
import verify_route as R  # noqa: E402
import verify_sources as S  # noqa: E402
import verify_targets as T  # noqa: E402
from test_verify import QUESTION, TempVault  # noqa: E402


# ─── verify_sources ───────────────────────────────────────────────────────────

class SourceCacheTests(unittest.TestCase):
    def test_a_url_has_one_stable_folder(self) -> None:
        url = "https://www.casact.org/sites/default/files/2021-03/7_Siewert.pdf"
        self.assertEqual(S.cache_key(url), S.cache_key(url + "  "))
        self.assertEqual(len(S.cache_key(url)), 16)
        self.assertNotEqual(S.cache_key(url), S.cache_key(url.replace("7_", "8_")))

    def test_the_cache_root_follows_the_environment(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            saved = S.os.environ.get(S.CACHE_ENV)
            S.os.environ[S.CACHE_ENV] = tmp
            try:
                self.assertEqual(S.source_dir("u"), Path(tmp) / S.cache_key("u"))
            finally:
                if saved is None:
                    del S.os.environ[S.CACHE_ENV]
                else:
                    S.os.environ[S.CACHE_ENV] = saved

    def test_a_page_spec_is_clipped_to_the_document(self) -> None:
        self.assertEqual(S.page_spec("3-5,9,40", 10), [3, 4, 5, 9])
        self.assertEqual(S.page_spec("", 3), [1, 2, 3])

    def test_search_rejoins_a_hyphenated_word_and_matches_whole_words(self) -> None:
        pages = ["The permis-\nsible loss ratio is", "a ratio of losses", "Loss Ratio Method"]
        hits = S.search_pages(pages, ["permissible loss ratio", "loss ratio", "ratio"])
        self.assertEqual(hits["permissible loss ratio"], [1])
        self.assertEqual(hits["loss ratio"], [1, 3])
        self.assertEqual(hits["ratio"], [1, 2, 3])

    def test_focus_pages_are_where_a_term_is_named_most(self) -> None:
        pages = ["loss cost", "loss cost loss cost loss cost", "nothing", "loss cost loss cost"]
        self.assertEqual(S.focus_pages(pages, ["loss cost"], limit=2), [2, 4])
        self.assertEqual(S.focus_pages(pages, ["absent"]), [])

    def test_a_citation_names_the_work_its_locator_its_digest_and_its_url(self) -> None:
        meta = {"url": "https://x.org/a.pdf", "sha256": "ab12", "title": "Doc title"}
        self.assertEqual(S.citation(meta, "Q12, p.4", "CAS Exam 5 Fall 2019"),
                         "CAS Exam 5 Fall 2019, Q12, p.4, sha256:ab12 — https://x.org/a.pdf")
        self.assertEqual(S.citation(meta), "Doc title, sha256:ab12 — https://x.org/a.pdf")

    def test_page_ranges_print_compactly(self) -> None:
        self.assertEqual(S.ranges([7, 1, 2, 3, 9, 10]), "1-3,7,9-10")
        self.assertEqual(S.ranges([]), "")


# ─── verify_paper ─────────────────────────────────────────────────────────────

MULTI_PART = """Given the following exposure information:

| Quarter | Written |
|---|---|
| 2017 Q1 | 100 |
| 2018 Q1 | 1,250 |

## Part a (0.5 points)

Calculate the 2017 policy year earned exposures.

### Explanation

The answer is 52.5 — worked here.

### Examiner Report

Candidates were expected to …

## Part b (0.25 points)

Calculate the in-force exposures.

### Sample Answers

In force = 400.
"""


class PaperTests(unittest.TestCase):
    def test_the_paper_table_is_read_from_the_apps_links(self) -> None:
        text = """
          'Exam 5|2019|fall': {
            url: 'https://www.casact.org/f19-5.pdf',
            label: "Examiner's Report",
          },
          'Exam MAS-II|2018|fall': { url: 'https://www.casact.org/masii.pdf', label: 'x' },
          'mas-ii': { url: 'https://syllabus.pdf', label: 'Syllabus' },
        """
        self.assertEqual(P.paper_links(text), {
            ("Exam 5", "2019", "fall"): "https://www.casact.org/f19-5.pdf",
            ("Exam MAS-II", "2018", "fall"): "https://www.casact.org/masii.pdf",
        })

    def test_every_dated_question_in_the_vault_has_a_paper(self) -> None:
        """A packet is keyed by paper; a dated question with no paper in the app's
        table, or no number in its id, could never be put in one."""
        links = P.paper_links()
        for q in P.all_questions():
            key = P.paper_key(q)
            if key is None:
                continue
            self.assertIn(key, links, q["path"])
            self.assertIsNotNone(q["num"], q["path"])

    def test_a_moved_question_belongs_to_the_paper_it_was_sat_on(self) -> None:
        meta = {"paper_exam": "Exam 7", "year": "2014", "session": "Spring"}
        self.assertEqual(P.paper_key(meta), ("Exam 7", "2014", "spring"))
        self.assertIsNone(P.paper_key({"paper_exam": "Probability", "year": "", "session": ""}))

    def test_the_blind_stem_keeps_every_prompt_and_drops_every_answer(self) -> None:
        blind = P.blind_stem(MULTI_PART)
        self.assertIn("Calculate the 2017 policy year earned exposures.", blind)
        self.assertIn("## Part b (0.25 points)", blind)
        self.assertIn("Calculate the in-force exposures.", blind)
        for leaked in ("52.5", "Candidates were expected", "In force = 400", "Explanation"):
            self.assertNotIn(leaked, blind)

    def test_a_top_level_explanation_is_cut_to_the_end(self) -> None:
        body = "Stem 3,850,000.\n\n- A) 0.568\n- B) 0.62\n\n## Explanation\n\nB, because 0.62.\n"
        blind = P.blind_stem(body)
        self.assertIn("- B) 0.62", blind)
        self.assertNotIn("because", blind)

    def test_numbers_drop_thousands_separators_and_trailing_zeros(self) -> None:
        self.assertEqual(P.numbers("4,200,000 and 5.00 and $1{,}175$ and 0.450"),
                         ["4200000", "5", "1175", "0.45"])

    def test_latex_environment_names_are_not_words(self) -> None:
        stem = r"$$F(x) = \begin{cases} 1 - e^{-x/100}, & x > 0 \\ 0, & \text{otherwise.} \end{cases}$$"
        self.assertNotIn("cases", P.words(stem))
        self.assertIn("otherwise", P.words(stem))

    def test_the_diff_ignores_options_and_the_vaults_part_headings(self) -> None:
        diffable = P.diffable(P.blind_stem(MULTI_PART + "\n- A) 9\n"))
        self.assertNotIn("Part a", diffable)
        self.assertNotIn("A) 9", diffable)
        self.assertIn("2018 Q1", diffable)

    def test_a_stem_is_located_on_its_own_page_and_diffed_there(self) -> None:
        stem = "Given the following exposure information: 2017 Q1 written 100, 2018 Q1 written 1,250."
        pages = {
            4: "Instructions to candidates. Write clearly.",
            5: "1. Given the following exposure information 2017 Q1 written 100 2018 Q1 written 1250",
            6: "2. Another question entirely about trend factors 1.05 and 0.97",
        }
        found = P.locate(stem, pages)
        self.assertEqual(found["pages"], [5])
        self.assertEqual(found["verdict"], "clean")

        pages[5] = pages[5].replace("1250", "1205")
        found = P.locate(stem, pages)
        self.assertEqual(found["pages"], [5])
        self.assertEqual(found["missing_numbers"], ["1250"])
        self.assertEqual(found["verdict"], "check")

    def test_a_stem_the_booklet_does_not_hold_diverges(self) -> None:
        stem = "Bars show exposures by industry; a dotted line plots the factor 1.45, 1.6 and 0.82."
        found = P.locate(stem, {1: "Calculate the written premium for fiscal year 2018."})
        self.assertEqual(found["verdict"], "diverges")

    def test_mechanical_checks_compare_points_parts_key_and_options(self) -> None:
        meta = {"points": "1.75", "answer": "B"}
        body = "## Part a (0.5 points)\nx\n## Part b (1.25 points)\ny\n- A) 0.568\n- B) 0.62\n"
        record = {"points": 1.75, "answer": "B",
                  "parts": [{"label": "a", "points": 0.5}, {"label": "b", "points": 1.25}],
                  "options": {"A": "0.568", "B": "0.62"}}
        self.assertEqual(P.mechanical_checks(meta, body, record), [])

        record = {"points": 2.0, "answer": "C",
                  "parts": [{"label": "a", "points": 0.75}, {"label": "c", "points": 1.25}],
                  "options": {"A": "0.586", "B": "0.62"}}
        issues = P.mechanical_checks(meta, body, record)
        self.assertIn("points: vault 1.75, report 2.0", issues)
        self.assertIn("parts: vault a,b, report a,c", issues)
        self.assertIn("part a points: vault 0.5, report 0.75", issues)
        self.assertIn("key: vault B, publisher C", issues)
        self.assertIn("option A: vault has 0.568 not in the publisher's '0.586'", issues)
        # A formula option's tokens come out of the text layer reordered: not a lead.
        scrambled = {"points": "1", "answer": "A"}
        body2 = "- A) $\\dfrac{45{,}000}{(1.032)^{12}} = 50{,}000$\n"
        self.assertEqual(P.mechanical_checks(scrambled, body2, {
            "points": 1, "answer": "A", "options": {"A": "12 45,000 50,000 (1.032) ="}}), [])
        self.assertEqual(P.mechanical_checks(meta, body, None),
                         ["the paper's report has no record for this question number"])

    def test_extract_codes_follow_the_converters_exam_names(self) -> None:
        self.assertEqual(P.extract_code("Exam 6C"), "6c")
        self.assertEqual(P.extract_code("Exam MAS-II"), "mas-ii")


# ─── verify_route ─────────────────────────────────────────────────────────────

EXAM_PAGE = """---
title: Exam 7
---

> [!example]- A. Estimation of Claims Liabilities {100%}
> Candidates apply [[Actuarial Principles]].
>
> 1. Perform [[Data Diagnostic Analysis|data diagnostics]].
> 2. Calculate [[Unpaid Claims]].
> 3. Test [[Unpaid Claims]] for [[Reasonableness Testing|reasonableness]].

## Source Material

>[!answer]- Source Material
>
> - [[Loss Development Using Credibility (Brosius - 1993)]]
>      - A1-A2 — CAS Study Note
> - [[Reserving for Reinsurance (Friedland - 2022)]]
>      - A3 — CAS Study Note, 2022
> - [[A Paper With No Codes]]
>      - CAS Forum, 2003
"""


class RouteTests(unittest.TestCase):
    def test_task_codes_expand_ranges_and_lists(self) -> None:
        self.assertEqual(R.task_codes("A1-A3, A6, C1-2"), {"A1", "A2", "A3", "A6", "C1", "C2"})
        self.assertEqual(R.assignment_codes(["A2-A3, A6-A7 — CAS Forum, Fall 2003"]),
                         {"A2", "A3", "A6", "A7"})
        self.assertEqual(R.assignment_codes(["Chapters 1, 3-16 — Werner"]), set())

    def test_an_exam_page_maps_concepts_and_readings_to_task_codes(self) -> None:
        with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as fh:
            fh.write(EXAM_PAGE)
        self.addCleanup(Path(fh.name).unlink)
        concepts, readings = R.exam_map(Path(fh.name))
        self.assertEqual(concepts["Data Diagnostic Analysis"], {"A1"})
        self.assertEqual(concepts["Unpaid Claims"], {"A2", "A3"})
        self.assertIsNone(concepts["Actuarial Principles"])  # preamble: no task
        self.assertEqual(readings["Loss Development Using Credibility (Brosius - 1993)"], {"A1", "A2"})
        self.assertEqual(readings["A Paper With No Codes"], set())

        maps = {"Exam 7": (concepts, readings)}
        self.assertEqual(R.candidates_for("Reasonableness Testing", ["Exam 7"], maps),
                         ["Reserving for Reinsurance (Friedland - 2022)"])
        # Linked under no task: every reading of the exam is a candidate.
        self.assertEqual(len(R.candidates_for("Actuarial Principles", ["Exam 7"], maps)), 3)

    def test_search_terms_include_aliases_and_both_halves_of_a_parenthesis(self) -> None:
        text = '---\naliases:\n  - "MCT ratio"\n  - Capital Test\n---\nBody\n'
        self.assertEqual(R.concept_terms("Minimum Capital Test (MCT)", text),
                         ["Minimum Capital Test (MCT)", "MCT ratio", "Capital Test",
                          "Minimum Capital Test", "MCT"])

    def test_set_cover_loads_the_fewest_readings(self) -> None:
        need = {"c1": {"Werner", "Friedland"}, "c2": {"Werner"}, "c3": {"Friedland"},
                "c4": {"Werner", "Clark"}, "c5": set()}
        self.assertEqual(R.set_cover(need), [("Werner", ["c1", "c2", "c4"]), ("Friedland", ["c3"])])


# ─── verify_record batch ──────────────────────────────────────────────────────

class BatchTests(TempVault):
    def setUp(self) -> None:
        super().setUp()
        import verify_record

        self.R = verify_record
        self.rels = ["questions/exam-5/q1.md", "questions/exam-5/q2.md"]
        for rel in self.rels:
            self.write(rel, V.upsert_verification(QUESTION, V.new_block(QUESTION, V.log_rel_for(rel))))

    def batch(self, ops: list[dict], *argv: str) -> None:
        path = self.root / "ops.json"
        path.write_text(json.dumps(ops), encoding="utf-8")
        saved = sys.argv
        sys.argv = ["verify_record.py", "batch", str(path), "--date", "2026-10-09", *argv]
        try:
            self.R.main()
        finally:
            sys.argv = saved

    def status(self, rel: str) -> str:
        return V.parse_verification((self.root / rel).read_text(encoding="utf-8"))["status"]

    def test_a_batch_records_a_whole_packet(self) -> None:
        self.batch([
            {"op": "pass", "path": self.rels[0], "status": "verified", "confidence": "high",
             "source": ["CAS Exam 5 Fall 2019, Q1, sha256:ab — https://x/a.pdf"], "checks": "recompute"},
            {"op": "finding", "path": self.rels[1], "severity": "minor", "locus": "stem",
             "claim": "Says 1,205.", "evidence": "The booklet p.5 prints 1,250.", "applied": True},
        ], "--run-id", "2026-10-09T00:00Z/abcd")
        self.assertEqual(self.status(self.rels[0]), "verified")
        finding = V.read_log(self.rels[1]).findings()[0]
        self.assertEqual(finding.fields["applied"], "true")
        self.assertEqual(finding.fields["run_id"], "2026-10-09T00:00Z/abcd")

    def test_a_batch_applied_twice_leaves_every_log_byte_identical(self) -> None:
        """A replayed batch — the same run's ops applied again — must append
        nothing: not a 'recurrence' of the findings it resolved, not a second
        resolution, not a second pass. Wave 1 hit exactly this."""
        ops = [
            {"op": "finding", "path": self.rels[0], "severity": "minor", "locus": "stem",
             "claim": "Says 1,205.", "evidence": "The booklet prints 1,250.", "applied": True},
            {"op": "resolution", "path": self.rels[0], "resolves": "F-001", "note": "Fixed."},
            {"op": "pass", "path": self.rels[0], "status": "verified", "confidence": "high",
             "source": ["CAS Exam 5 Fall 2019, Q1, sha256:ab — https://x/a.pdf"]},
        ]
        self.batch(ops, "--run-id", "2026-10-09T00:00Z/abcd")
        log_path = self.root / V.log_rel_for(self.rels[0])
        page_path = self.root / self.rels[0]
        first = (log_path.read_text(encoding="utf-8"), page_path.read_text(encoding="utf-8"))
        self.batch(ops, "--run-id", "2026-10-09T00:00Z/abcd")
        self.assertEqual((log_path.read_text(encoding="utf-8"), page_path.read_text(encoding="utf-8")), first)
        self.assertEqual(len(V.read_log(self.rels[0]).findings()), 1)

    def test_a_pass_after_an_edit_and_a_sync_is_recorded_in_the_same_run(self) -> None:
        """Edit a verified page, let the sync mark it stale (refreshing the
        hash), then record the same pass again in the same run: that is a
        re-check of new bytes, not a replay, and must verify the page."""
        op = {"op": "pass", "path": self.rels[0], "status": "verified", "confidence": "high",
              "source": ["CAS Exam 5 Fall 2019, Q1, sha256:ab — https://x/a.pdf"]}
        self.batch([op], "--run-id", "2026-10-09T00:00Z/abcd")
        page = self.root / self.rels[0]
        edited = page.read_text(encoding="utf-8").replace("- B) 0.62", "- B) 0.620", 1)
        self.assertNotEqual(edited, page.read_text(encoding="utf-8"))
        block = V.parse_verification(edited)
        block.update(status="stale", confidence=None, content_hash=V.content_hash(edited))
        page.write_text(V.upsert_verification(edited, block), encoding="utf-8")
        self.assertEqual(self.status(self.rels[0]), "stale")
        self.batch([op], "--run-id", "2026-10-09T00:00Z/abcd")
        self.assertEqual(self.status(self.rels[0]), "verified")

    def test_a_later_run_still_records_a_recurrence(self) -> None:
        ops = [{"op": "finding", "path": self.rels[0], "severity": "minor", "locus": "stem",
                "claim": "Says 1,205.", "evidence": "The booklet prints 1,250."},
               {"op": "resolution", "path": self.rels[0], "resolves": "F-001", "note": "Fixed."}]
        self.batch(ops, "--run-id", "2026-10-09T00:00Z/abcd")
        self.batch(ops[:1], "--run-id", "2026-10-16T00:00Z/ef01")
        findings = V.read_log(self.rels[0]).findings()
        self.assertEqual([f.fields.get("recurrence_of", "") for f in findings], ["", "F-001"])

    def test_a_malformed_op_stops_the_batch_before_anything_is_written(self) -> None:
        with self.assertRaises(SystemExit) as caught:
            self.batch([
                {"op": "pass", "path": self.rels[0], "status": "in_review"},
                {"op": "finding", "path": self.rels[1], "severity": "huge", "locus": "x",
                 "claim": "x", "evidence": "x"},
            ])
        self.assertIn("op 1 is malformed", str(caught.exception.code))
        self.assertIsNone(V.read_log(self.rels[0]))
        self.assertEqual(self.status(self.rels[0]), "unverified")

    def test_the_p1_refusal_still_holds_inside_a_batch(self) -> None:
        with self.assertRaises(SystemExit) as caught:
            self.batch([
                {"op": "pass", "path": self.rels[0], "status": "in_review"},
                {"op": "pass", "path": self.rels[1], "status": "verified", "confidence": "high"},
                {"op": "pass", "path": self.rels[0], "status": "verified", "confidence": "high",
                 "source": ["a source"]},
            ])
        self.assertIn("stopped at op 1", str(caught.exception.code))
        self.assertEqual(self.status(self.rels[0]), "in_review")
        self.assertEqual(self.status(self.rels[1]), "unverified")


# ─── verify_targets --by-source ───────────────────────────────────────────────

class PacketTests(unittest.TestCase):
    links = {("Exam 7", "2014", "spring"): "https://cas/7-14.pdf"}

    def test_a_moved_question_joins_its_papers_packet(self) -> None:
        text = ('---\nid: "cas7-2014-q4"\nexam: "Exam 9"\noriginally_exam: "Exam 7"\n'
                'year: 2014\nsession: Spring\n---\nBody\n')
        self.assertEqual(T.packet_of("questions/exam-9/cas7-2014-004.md", text, self.links, None, {}),
                         ("paper: Exam 7 Spring 2014", "https://cas/7-14.pdf"))

    def test_an_undated_question_joins_its_sample_set(self) -> None:
        text = '---\nid: "fm-351"\nexam: "Financial Mathematics"\n---\nBody\n'
        self.assertEqual(T.packet_of("questions/exam-fm/fm-351.md", text, self.links, None, {}),
                         ("sample set: exam-fm", ""))

    def test_a_routed_concept_and_its_readings_resource_page_share_a_packet(self) -> None:
        routes = {
            "concepts": {"Concepts/Clash Cover.md": {
                "packet": "Clark", "state": "routed", "exams": ["Exam 9 (CAS).md"],
                "candidates": [{"reading": "Clark", "url": "https://cas/clark.pdf"}]}},
            "packets": [{"reading": "Clark", "resource": "Resources/Books/Clark.md",
                         "url": "https://cas/clark.pdf"}],
        }
        expected = ("reading: Clark", "https://cas/clark.pdf")
        self.assertEqual(T.packet_of("Concepts/Clash Cover.md", "", {}, routes, None), expected)
        self.assertEqual(T.packet_of("Resources/Books/Clark.md", "", {}, routes, None), expected)

    def test_generated_syllabus_pages_are_one_packet(self) -> None:
        text = "---\nsyllabus:\n  source_url: x\n---\nBody\n"
        self.assertEqual(T.packet_of("Exam FAM (SOA).md", text, {}, None, {})[0],
                         "syllabus pages: generated from .syllabus/ JSON")
        self.assertEqual(T.packet_of("Exam 7 (CAS).md", "---\na: b\n---\n", {}, None, {})[0],
                         "syllabus page: Exam 7 (CAS)")

    def test_a_packet_ranks_by_its_most_urgent_file_then_its_size(self) -> None:
        packets = [T.Packet("big", "", T.BAND_NEVER, ["a", "b", "c"]),
                   T.Packet("urgent", "", T.BAND_FINDINGS, ["d"]),
                   T.Packet("small", "", T.BAND_NEVER, ["e"])]
        self.assertEqual([p.key for p in sorted(packets, key=T.Packet.sort_key)],
                         ["urgent", "big", "small"])


if __name__ == "__main__":
    unittest.main()
