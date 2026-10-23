---
target: questions/exam-altam/altam-2023s-q5.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation, V = ... = 322,128
- claim: The accumulated fund is given as 322,128 with no marker.
- evidence: SOA ALTAM Spring 2023 solutions p.11 prints 322,128. The printed formula 6,600(1.02796)(1+i)^19 (1-(1.03v)^20)/(1-1.03v) with i = 6.1678% gives 322,137.46 (recomputed independently by summing the 240 monthly contributions: 322,137.46). The question only asks for 322,000 to the nearest 1000, so no answer changes. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: fd6a3f9fe403

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, 322,128(1+i)^20 = 1,066,341
- claim: The equation of value gives 322,128(1+i)^20 = 1,066,341 with no marker.
- evidence: SOA ALTAM Spring 2023 solutions p.11. 322,128 x 1.061678^20 = 1,066,310; the printed 1,066,341 follows the unrounded 322,137 (x 3.31020 = 1,066,341). C = 0.069698 and 3.485% each are right (recomputed 0.0696982). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 0dc0532ff88d

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
- sources_checked: SOA Exam ALTAM Spring 2023 — exam (question paper), Q5, pp.10-11, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf; SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q5, pp.11-12, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf
- note: Stem matches exam pp.10-11 ((b) setup under Part b); explanation and comments match solutions pp.11-12. Recompute: fund 322,137.46, target annuity 105,514, C = 0.069698 (3.485% each). Two SOA slips (322,128 and the 1,066,341 that follows the unrounded value) marked (as printed). 2 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
