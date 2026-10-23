---
target: questions/exam-astam/astam-2024f-q3.md
created: 2026-10-23
---

## [F-001] SOA (b) stops at E[X ^ d], not the LER asked for, not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b explanation
- claim: Part b ends at E[X_j ^ d] = 494.79 without saying the ratio is not printed.
- evidence: Solutions PDF p.5 (image page, read as an image) ends (b) at 494.79 and the Note; the question asks for the loss elimination ratio (booklet p.5). Recompute E[X ^ 500] = 494.788, E[X] = 1242.648, LER = 0.398. Listed in A.6. Composing the missing step would be authoring, so only the marker is added.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: a9e87454b889

## [F-002] SOA 'oayment' not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part e explanation (i)
- claim: The annotation reads '2500 is insurer oayment plus deductible' with no note.
- evidence: Solutions PDF p.7 prints 'oayment'. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: fe14a5153a7c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed; the solution ends here)' in place; the ratio itself is not added (that would be new prose).

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
- sources_checked: SOA Exam ASTAM Fall 2024, question booklet, Q3, pp.5-6, sha256:c7e45ae70452fc50709e1721f3b9242de1e2af1ac0afc1cc29cf0449fb683f94 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-astam-exam.pdf; SOA ASTAM October 2024 Model Solutions, Q3, pp.4-8, sha256:f1aa2ecb9f29f00351447712a247f5ac19c2cff2bd2d69a892e6eeb5854c9f8e — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: E[S] 994.12, SD 1354.0, E[X^500] 494.79 (LER 0.398), v 0.9419, P0 0.51779, P1 0.29447, premium 30.472. 2 SOA printed slip(s) marked '(as printed)'. Confidence medium: the SOA’s (b) stops before the LER it asks for, so (b)'s key is not printed.
