---
target: questions/exam-altam/altam-2023f-q2.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation, EPV death benefit line
- claim: The substituted line reads (0.9088)(0.33174) and (0.04512)(0.41861) with no marker.
- evidence: SOA ALTAM Fall 2023 solutions p.5 prints 0.33174 and 0.04512; the given table (exam p.5) has A-bar^02_60 = 0.33714 and 10p^01_50 = 0.04152 (digits transposed in print). The printed 2240.14 follows the table values (recomputed 2240.14; the transposed values would give 2446.40). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 37dc61716eb3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed typo kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Examiner reports, parts a, c and d
- claim: Three comments read "most candidate" with no marker.
- evidence: SOA ALTAM Fall 2023 solutions p.6 prints "most candidate understood", "most candidate did well" (twice). Kept as printed; "(as printed)" added to each.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: b0687caaf242

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
- sources_checked: SOA Exam ALTAM Fall 2023 — exam (question paper), Q2, pp.4-5, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf; SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q2, pp.4-6, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf
- note: Stem, the three model diagrams and the Model 3 table match exam pp.4-5; explanation, sketch and comments match solutions pp.4-6. Recompute: Woolhouse a-dot 7.8199, P 495.83, dV/dt at 5+ -648.6. Two SOA slips (transposed table values, 'most candidate') marked. 2 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
