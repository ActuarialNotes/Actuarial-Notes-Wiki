---
target: questions/exam-astam/astam-2024s-q6.md
created: 2026-10-23
---

## [F-001] SOA uses lambda for the Pareto scale gamma not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b explanation (ii)
- claim: The mean excess formula reads (lambda + Q)/(alpha - 1) with no note.
- evidence: Solutions PDF p.16 prints lambda (and lambda-hat in the next line) where the scale is gamma; the figure 14,583.3 uses gamma-hat = 6,726.8 (recompute 14,583.28). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 647622030e60

## [F-002] Missing subscript on d_n in the SOA MDA proof not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c explanation, first line
- claim: The first line reads Pr[M_n <= c_n x + d] with no note.
- evidence: Solutions PDF p.16 prints c_n x + d; the next lines use d_n. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 5ca2697a6751

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

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Spring 2024 (April 24, 2024), question booklet, Q6, pp.9-10, sha256:e41c30b8ef94a58adba9510cdeb6875db0e3a2abdb3491df90b0eab848421fdf — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-astam-exam.pdf; SOA ASTAM April 2024 Model Solutions, Q6, pp.15-18, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: VaR 9,497.34, ES 14,583.3, GPD VaR 9,460.71, ES 23,275.3. 2 SOA printed slip(s) marked '(as printed)'.
