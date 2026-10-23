---
target: questions/exam-altam/altam-2023f-q5.md
created: 2026-10-23
---

## [F-001] SOA printed typo kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation, final line
- claim: The final line gives AV_9 = Min(96,698.82 and 96,626.45) = 96.626.45 with no marker.
- evidence: SOA ALTAM Fall 2023 solutions p.12 prints "96.626.45" for 96,626.45. Recomputed AV_9 = 96,626.45 (corridor applies: without it AV_9 = 96,698.82, and 1.05 x 96,698.82 = 101,534 > 100,000). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 1cae47c36620

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
- sources_checked: SOA Exam ALTAM Fall 2023 — exam (question paper), Q5, p.10, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf; SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q5, pp.11-12, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf
- note: Stem matches exam p.10 (Type B and Type A setups under (b) and (d), as printed); explanation and comments match solutions pp.11-12. Recompute: CoI 1,772.4, AV_1 7,626.5, Type A AV_1 7,773.9, AV_9 96,626.45 (corridor binds). 1 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
