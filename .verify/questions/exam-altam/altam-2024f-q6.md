---
target: questions/exam-altam/altam-2024f-q6.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (i), p(0) line
- claim: d_1 is given as 0.47434 and the next line uses Phi(-0.47432), with no marker.
- evidence: SOA ALTAM Fall 2024 solutions p.13 (image page, read as an image) prints Phi(-0.47432) after d_1 = 0.47434 (recomputed d_1 = 0.474342). p(0) = 156.89 and pi(0) = 147.88 are right (recomputed). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 43e94a54700c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed typos kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Examiner reports, parts a, b and c
- claim: The comments read "Black-Sholes", "with stating why" and "did the best on part of the question" with no markers.
- evidence: SOA ALTAM Fall 2024 solutions p.15 prints all three. Kept as printed; "(as printed)" added to each.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 4acb01e72809

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA Exam ALTAM Fall 2024 — exam (question paper), Q6, pp.13-14, sha256:a75dc6453611a1e32f792a8f6c5efa70b61d82ce0a86291594d816b74f01b830 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-altam-exam.pdf; SOA Exam ALTAM Fall 2024 — model solutions and examiners' comments, Q6, pp.13-15, sha256:bef60a4ff411c7fa3eb0fd8d4b6a52a32d8ddf620ff365270c2a6dce96299a4f — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-altam-solutions.pdf
- note: Stem matches exam pp.13-14 ((b) setup under Part b); explanation and comments match solutions pp.13-15, p.13 read as an image (OCR'd page). Recompute: p(0) 156.89, pi(0) 147.88, c 0.0167, F_3 1,412.65, pi(3) 60.85, future charge 151.0 > pi(3). 2 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
