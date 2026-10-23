---
target: questions/exam-altam/altam-2024f-q5.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (i), AV_41.6 line
- claim: The projection starts from 109,500 with no marker.
- evidence: SOA ALTAM Fall 2024 solutions p.11 starts from 109,500; the question (exam p.12) gives AV_41 = 109,467, and the SOA's own comment (p.12) quotes 109,467. From 109,467 the death benefit is 201,286 (recomputed); the printed 101,320 / 201,320 follow 109,500. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: ef7075162cb1

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
- sources_checked: SOA Exam ALTAM Fall 2024 — exam (question paper), Q5, pp.11-12, sha256:a75dc6453611a1e32f792a8f6c5efa70b61d82ce0a86291594d816b74f01b830 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-altam-exam.pdf; SOA Exam ALTAM Fall 2024 — model solutions and examiners' comments, Q5, pp.10-12, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf
- note: Stem matches exam pp.11-12; explanation, both sketches (Media/Attachments, cropped from solutions pp.10-11) and comments match solutions pp.10-12. Recompute: AV_1 1,817.88, AV_2 3,729.24, age 74 (deductions 1,899.7 at 73, 2,112.8 at 74), DB 201,286 from the stem's 109,467 (SOA 201,320 from 109,500, marked), joint CoI = single CoI 145.02. 1 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
