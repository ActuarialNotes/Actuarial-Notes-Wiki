---
target: questions/exam-astam/astam-2023f-q1.md
created: 2026-10-23
---

## [C-001] Wording 'theta* is 1080' differs from the SOA’s 'theta* = 1080'
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- locus: Part c explanation (i)
- note: Solutions PDF p.2 prints 'where theta* = 1080'; the vault writes 'where theta* is 1080'. The meaning is identical; restoring '=' trips question_lint’s 'align* line packs formula and result' check (tried this pass), so the converter’s wording is left as is.

## [F-001] SOA wording 'aggregate payments to the insurer' not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d stem
- claim: Part d asks for the insurer’s 'expected aggregate payments to the insurer' with no note.
- evidence: Question booklet p.2, (d), prints 'the insurer’s expected aggregate payments to the insurer'; payments are by the insurer. Listed in A.6 (checkers' finds).
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 3f787a3d5dec

## [F-002] Examiners' comment 'Full credit or no credit' not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part b examiner report
- claim: The comment reads 'Full credit or no credit was given for other approaches' with no note.
- evidence: Solutions PDF p.4 prints exactly this; A.6 lists it as a probable slip (partial credit meant). Kept verbatim.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 0536eb9f2051

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Fall 2023, question booklet, Q1, pp.2-3, sha256:94277623c3540e1ab20e885d53ae2c5a1e1290e3e1061dc162aa832e8e3efd92 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-astam-exam.pdf; SOA ASTAM Fall 2023 Model Solutions (revised February 20, 2024), Q1, pp.1-4, sha256:0e43330341132ce0ac5392dd785e2897506886c307700d7bdd5c03f55b57502c — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/astam-fall-2023-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: SD 716.24, d 67.67, E[N*] 1.4900 (SOA 1.4898 from rounded 1147.7), L 2085.6, f0 0.19448, fS(0) 0.21643. 2 SOA printed slip(s) marked '(as printed)'.
