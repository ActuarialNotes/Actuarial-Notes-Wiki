---
target: questions/exam-astam/astam-2023f-q3.md
created: 2026-10-23
---

## [F-001] Question’s '1100 to the nearest 1' for theta-hat not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b(i) stem
- claim: The stem asks to show theta-hat = 1100 to the nearest 1 with no note.
- evidence: Question booklet p.6 prints 'theta-hat = 1100 to the nearest 1'. Solutions PDF p.8 gives theta-hat = 1015.92/0.92463 = 1098.73, which is 1,099 to the nearest 1 (1,100 to the nearest 10); recompute 1098.731. Not in A.6; found in this pass. SOA slip in the stem, transcribed correctly.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: dd760955ad37

## [F-002] Unclosed parenthesis in the SOA LRT line not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c explanation (iii)
- claim: '(difference between the number of parameters.' has no closing parenthesis and no note.
- evidence: Solutions PDF p.9 prints it unclosed. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 821bb1e0999c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed; the solution gives 1098.73)' in place.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Fall 2023, question booklet, Q3, pp.5-7, sha256:94277623c3540e1ab20e885d53ae2c5a1e1290e3e1061dc162aa832e8e3efd92 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-astam-exam.pdf; SOA ASTAM Fall 2023 Model Solutions (revised February 20, 2024), Q3, pp.8-10, sha256:0e43330341132ce0ac5392dd785e2897506886c307700d7bdd5c03f55b57502c — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/astam-fall-2023-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: l_exp -7923.55, theta 1098.73, l_gam -7921.5, AIC/SBC/LRT 4.10, P 0.002723 / 0.003521. 2 SOA printed slip(s) marked '(as printed)'. Confidence medium: the stem’s '1100 to the nearest 1' is the SOA’s slip (1098.73), kept as printed.
