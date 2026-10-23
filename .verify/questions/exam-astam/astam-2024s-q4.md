---
target: questions/exam-astam/astam-2024s-q4.md
created: 2026-10-23
---

## [F-001] SOA invariance statement 'h(theta) = h(theta-hat)' not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e explanation (i)
- claim: (e)(i) states the invariance property as h(theta) = h(theta-hat) with no note.
- evidence: Solutions PDF p.10 prints h(theta) = h(theta-hat); the MLE of h(theta) is h(theta-hat) (the left side wants a hat). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 3d893ac544fa

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Spring 2024 (April 24, 2024), question booklet, Q4, p.7, sha256:e41c30b8ef94a58adba9510cdeb6875db0e3a2abdb3491df90b0eab848421fdf — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-astam-exam.pdf; SOA ASTAM April 2024 Model Solutions, Q4, pp.9-11, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: theta 10.3169, SD 0.3439, Var 11.2115, CI (9.7465, 12.6765). 1 SOA printed slip(s) marked '(as printed)'.
