---
target: questions/exam-astam/astam-2024f-q5.md
created: 2026-10-23
---

## [F-001] Unbalanced brackets in the SOA (c)(ii) silently corrected
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation (ii)
- claim: The vault prints E[X](1 + E[X]) in both lines, balanced.
- evidence: Solutions PDF p.13 (cropped at 260 dpi) prints "2a + E[X](1 + E[X)" and "a = (Var(X) - E[X](1+E[X))/2": the closing bracket on the second E[X is a parenthesis. Listed in A.6 as kept as printed, but the transcriber had balanced it.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 75bba8a62721

## [F-002] SOA placement of the 2500/2499 factor not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d explanation (ii)
- claim: s^2 line multiplies only (0.1436)^2 by 2500/2499 with no note.
- evidence: Solutions PDF p.13 prints the factor on the squared-mean term only; that expression gives 0.24360 - 0.02063 = 0.22297, while the printed 0.22307 is (0.24360 - 0.02062) x 2500/2499 (recompute of the unbiased s^2: 0.223068). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 74b12bd2a801

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Restored 'E[X](1 + E[X)' in both lines as printed and marked each '(as printed)'.

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
- sources_checked: SOA Exam ASTAM Fall 2024, question booklet, Q5, pp.9-10, sha256:c7e45ae70452fc50709e1721f3b9242de1e2af1ac0afc1cc29cf0449fb683f94 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-astam-exam.pdf; SOA ASTAM October 2024 Model Solutions, Q5, pp.13-14, sha256:f1aa2ecb9f29f00351447712a247f5ac19c2cff2bd2d69a892e6eeb5854c9f8e — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: mu 0.1436, SD 0.4723, a 0.02942, v 0.19364, 0.2566, 0.5133. 2 SOA printed slip(s) marked '(as printed)'.
