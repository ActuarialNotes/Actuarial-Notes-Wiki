"""Tests for verify_repass.py: the pure half (routing, claims, seeding, scoring)."""
import json
import random
import tempfile
import unittest
from pathlib import Path

import verify_repass as R

PAGE = """![[Media/Figures/X.svg|340]]

A **Widget** is the sum of two [[Part|parts]], each at most 5.

> $$W = a + b$$

- $a$ is the first part.
- $b$ is the second part.

> [!example]- Parts of 2 and 3 make what widget? {Example}
> - $W = 2 + 3 = 5$.

## Variance of a widget

The variance increases with the parts.

> [!trap] Adding the wrong parts
> Read which parts are meant.
"""


class Sources(unittest.TestCase):
    def test_url_and_pages_are_read_off_a_citation(self):
        s = "G&S, §4.1 (pp.145-146, PDF pp.153-154), and Ch. 5 (PDF p.206), sha256:ab — https://x.org/prob.pdf"
        self.assertEqual(R.source_url(s), "https://x.org/prob.pdf")
        self.assertEqual(R.source_pages(s), [153, 154, 206])

    def test_a_citation_naming_no_pdf_page_gives_none(self):
        self.assertEqual(R.source_pages("Siegrist, §3 — https://x.org/a.html"), [])

    def test_a_url_keeps_its_own_closing_bracket(self):
        self.assertEqual(R.source_url('"W (see https://en.wikipedia.org/wiki/Copula_(statistics))"'),
                         "https://en.wikipedia.org/wiki/Copula_(statistics)")

    def test_a_page_joins_the_packet_of_its_most_cited_source(self):
        pages = [{"path": "Concepts/A.md", "sources": ["x — https://big.org/b.pdf", "y — https://small.org/s"]},
                 {"path": "Concepts/B.md", "sources": ["x — https://big.org/b.pdf"]},
                 {"path": "Concepts/C.md", "sources": []}]
        pk = R.packets(pages)
        self.assertEqual([p["path"] for p in pk["https://big.org/b.pdf"]], ["Concepts/A.md", "Concepts/B.md"])
        self.assertEqual([p["path"] for p in pk[""]], ["Concepts/C.md"])


class Claims(unittest.TestCase):
    def test_a_page_is_cut_into_its_kinds(self):
        kinds = [u["kind"] for u in R.split_units(PAGE)]
        self.assertEqual(kinds, ["definition", "formula", "bullet", "bullet", "example", "heading", "prose", "trap"])

    def test_an_example_carries_its_question_alone(self):
        ex = [u for u in R.split_units(PAGE) if u["kind"] == "example"][0]
        self.assertEqual(ex["question"], "Parts of 2 and 3 make what widget?")
        self.assertNotIn("= 5", R.blind_markdown("Concepts/W.md", R.split_units(PAGE)))

    def test_carried_ignores_markup_and_flags_new_words_and_numbers(self):
        old = PAGE.replace("each at most 5", "each at most 5").replace("> $$W = a + b$$", "> $$\\displaystyle W = a + b$$")
        new = PAGE.replace("The variance increases with the parts.", "The variance is 7 times the parts.")
        units = R.tag_units(R.split_units(new), old)
        by = {u["text"][:12]: u for u in units}
        self.assertTrue(by["> $$W = a + "]["carried"])
        self.assertFalse(by["The variance"]["carried"])
        self.assertEqual(by["The variance"]["new_numbers"], ["7"])

    def test_with_no_verified_revision_nothing_is_carried(self):
        self.assertFalse(any(u["carried"] for u in R.tag_units(R.split_units(PAGE), None)))


class Seeding(unittest.TestCase):
    def test_plants_change_one_line_each_and_are_keyed(self):
        body, planted = R.mutate(PAGE, 3, random.Random(1))
        self.assertEqual({p["kind"] for p in planted}, {"formula", "example", "prose"})
        was, now = PAGE.split("\n"), body.split("\n")
        changed = [i + 1 for i, (a, b) in enumerate(zip(was, now)) if a != b]
        self.assertEqual(sorted(changed), sorted(p["line"] for p in planted))
        for p in planted:
            self.assertEqual(was[p["line"] - 1], p["was"])
            self.assertEqual(now[p["line"] - 1], p["now"])

    def test_a_formula_is_changed_only_right_of_its_equals_sign(self):
        body, planted = R.mutate("> $$\\text{Var}(X - Y) = \\sigma_X^2 + \\sigma_Y^2$$\n", 1, random.Random(1))
        self.assertIn("Var}(X - Y) =", body)
        self.assertEqual(len(planted), 1)
        self.assertEqual(R.mutate("> $$F(x) = P(X \\le x)$$\n", 1, random.Random(1))[1], [])

    def test_the_same_seed_plants_the_same_errors(self):
        self.assertEqual(R.mutate(PAGE, 3, random.Random(5)), R.mutate(PAGE, 3, random.Random(5)))

    def test_a_plant_is_caught_only_by_a_finding_that_quotes_it(self):
        _, planted = R.mutate(PAGE, 3, random.Random(1))
        key = {"Concepts/Widget.md": planted}
        with tempfile.TemporaryDirectory() as d:
            f = Path(d) / "Widget.json"
            f.write_text(json.dumps({"findings": [{"quote": planted[0]["now"], "severity": "critical"}]}))
            r = R.score(key, Path(d))
            self.assertEqual((r["planted"], r["caught"]), (3, 1))
            f.write_text(json.dumps({"findings": [{"quote": "something else on the page", "severity": "nit"}]}))
            self.assertEqual(R.score(key, Path(d))["caught"], 0)


class Ops(unittest.TestCase):
    key = None
    def _run(self, result):
        with tempfile.TemporaryDirectory() as d:
            d = Path(d)
            (d / "manifest.json").write_text(json.dumps({"pages": [{"path": "Concepts/Widget.md", "dir": "pages/Widget"}]}))
            (d / "f").mkdir()
            (d / "f" / "Widget.json").write_text(json.dumps(result))
            return R.ops_from_findings(d / "f", d, self.key)

    def test_a_clean_page_with_a_source_passes_as_verified(self):
        ops, _ = self._run({"verdict": "clean", "sources": ["S, p.1, sha256:ab — https://x.org"], "findings": [], "checks": "c"})
        self.assertEqual([(o["op"], o.get("status")) for o in ops], [("pass", "verified")])

    def test_no_source_never_verifies(self):
        self.assertEqual(self._run({"verdict": "clean", "sources": [], "findings": []})[0][0]["status"], "in_review")

    def test_an_open_finding_holds_the_page_in_review(self):
        ops, _ = self._run({"verdict": "findings", "sources": ["S — https://x.org"], "findings": [
            {"severity": "critical", "locus": "C2", "claim": "a", "evidence": "b"}]})
        self.assertEqual([(o["op"], o.get("status")) for o in ops], [("finding", None), ("pass", "in_review")])

    def test_a_nit_alone_does_not_hold_a_page(self):
        ops, _ = self._run({"verdict": "findings", "sources": ["S — https://x.org"], "findings": [
            {"severity": "nit", "locus": "C2", "claim": "a", "evidence": "b"}]})
        self.assertEqual(ops[-1]["status"], "verified")

    def test_a_planted_error_is_dropped_when_caught_and_holds_the_page_back_when_missed(self):
        plant = {"kind": "formula", "line": 5, "was": "> $$W = a + b$$", "now": "> $$W = a - b$$"}
        self.key = {"Concepts/Widget.md": [plant]}
        result = {"verdict": "findings", "sources": ["S — https://x.org"], "findings": [
            {"severity": "critical", "locus": "C2", "quote": "$$W = a - b$$", "claim": "a", "evidence": "b"}]}
        ops, again = self._run(result)
        self.assertEqual(([(o["op"], o.get("status")) for o in ops], again), ([("pass", "verified")], []))
        ops, again = self._run({**result, "findings": []})
        self.assertEqual((ops, again), ([], ["Concepts/Widget.md"]))


if __name__ == "__main__":
    unittest.main()
