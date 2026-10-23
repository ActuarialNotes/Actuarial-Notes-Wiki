---
target: questions/exam-astam/astam-2023s-q6.md
created: 2026-10-23
---

## [F-001] SOA mixed rounding in X-hat_{2,3}, X-hat_{2,4} not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b explanation
- claim: Part b writes 245.8 - 225 = 20.77 and 267.8 - 245.8 = 22.03 with no note.
- evidence: Solutions PDF p.14 prints both lines as transcribed: the differences use 245.77 and 267.80 unrounded (20.77, 22.03), while the displayed operands are rounded to one decimal. Recompute: C_23 = 245.769, X_23 = 20.769, X_24 = 22.034. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 05a4063b3b9c

## [F-002] Part d solution labels renumbered from the SOA's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d explanation, sub-part labels
- claim: The vault labels part d’s solution (i)-(iii) and folds the SOA’s '(ii) Similarly, we have' step into (i).
- evidence: Solutions PDF p.15 labels the steps (i) MLE of E[X_23], (ii) 'Similarly, we have' gamma-hat_3, gamma-hat_4, (iii) SD, (iv) CI, against the question’s (i)-(iii) (booklet p.12). Listed in A.6 as kept as printed, but the transcriber had renumbered them.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: be861971a39e

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
- note: Restored the SOA’s labels (i)-(iv) as printed and marked (iv) '(as printed)'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Spring 2023 (April 26, 2023), question booklet, Q6, pp.11-12, sha256:fc23b48a1dbfd1d9c85380d5a3605927ba53d90641d5dcba1ab238bf3e02abaf — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-astam.pdf; SOA ASTAM April 2023 Model Solutions, Q6, pp.14-15, sha256:ac32f8885c3d0e8456bb4edec83c8bf8a89243d21bd6ddaa232842c22d3640a3 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-astam.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: X23 20.77, X24 22.03, gamma3 0.0776, gamma4 0.0823, SD 6.542, CI (29.98, 55.63). 2 SOA printed slip(s) marked '(as printed)'.
