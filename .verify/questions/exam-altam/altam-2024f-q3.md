---
target: questions/exam-altam/altam-2024f-q3.md
created: 2026-10-23
---

## [F-001] SOA printed typo kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Stem, valuation assumption (vii)
- claim: The stem reads "accrued benifits" with no marker.
- evidence: SOA ALTAM Fall 2024 exam p.8 prints "benifits". Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 6c892b2d4bb2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part from the blind stem before reading the vault's explanation or the SOA solution (SULT built from its Makeham parameters; other tables as cited); stem, table, diagram and formula diff against the 100-dpi page images of the SOA question paper; explanation diff against the solution page images (method, figures, arithmetic, align rows); examiners' comments verbatim and filed under the part they name; every part's setup under the part the SOA prints it before; Media/Attachments diagrams exist and match the page; points per part and total; type multi-part; topic and wiki_link pages exist; validate_content.py --strict and question_lint.py pass
- sources_checked: SOA Exam ALTAM Fall 2024 — exam (question paper), Q3, pp.7-8, sha256:a75dc6453611a1e32f792a8f6c5efa70b61d82ce0a86291594d816b74f01b830 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-altam-exam.pdf; SOA Exam ALTAM Fall 2024 — model solutions and examiners' comments, Q3, pp.4-6, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf
- note: Stem and table match exam pp.7-8; explanation and comments match solutions pp.4-6. Recompute (SULT, Woolhouse 2-term): reversionary 1.8667, AL 827,200 (SOA 827,202), NC 28,322 = 13.22%, increase 100,641. 1 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
