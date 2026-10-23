---
target: questions/exam-astam/astam-2023s-q5.md
created: 2026-10-23
---

## [F-001] SOA denominator 12,292.0 not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation, B = 2,630,488 / 12,292.0
- claim: Part c divides by 12,292.0 with no note.
- evidence: Solutions PDF p.13 prints 2,630,488/12,292.0 = 217.84. The bracket it divides by, 5000 + 0.95(2200) + 1.15(3100) + 1.15(0.95)(1300), is 12,075.25, and 2,630,488/12,075.25 = 217.84; 2,630,488/12,292.0 would be 214.0. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: e4eb38f17733

## [F-002] SOA result 4.36% for (d)(i) differs from its own expression (4.38%)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d explanation (i)
- claim: Part d(i) states the Territory B increase is 4.36% with no note.
- evidence: Solutions PDF p.13 prints 217.84/200.00 x 1.15/1.20 - 1 = 4.36%. That expression is 1.0892 x 0.958333 - 1 = 0.04382 = 4.38%; an independent recompute of the new to old Territory B premium (217.8413 x 1.15 x 4,335 / 1,040,400) also gives 4.38%. Listed in A.6. This is the SOA’s arithmetic slip in one sub-part result, not a transcription error; rank 1 page vs rank 5 recompute, logged as the conflict, kept as printed.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: be90a193b8dc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(12,292.0 as printed; the bracket sums to 12,075.25)' in place.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked '(as printed; these figures give 4.38%)' in place. The SOA’s printed 4.36% is kept, the recompute and the SOA’s own expression both give 4.38%.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Spring 2023 (April 26, 2023), question booklet, Q5, pp.9-10, sha256:fc23b48a1dbfd1d9c85380d5a3605927ba53d90641d5dcba1ab238bf3e02abaf — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-astam.pdf; SOA ASTAM April 2023 Model Solutions, Q5, pp.12-13, sha256:ac32f8885c3d0e8456bb4edec83c8bf8a89243d21bd6ddaa232842c22d3640a3 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-astam.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: differential 1.1713, base 217.84, B +4.38% (SOA 4.36%), A +8.92%. 2 SOA printed slip(s) marked '(as printed)'. Confidence medium: the SOA’s own (d)(i) result 4.36% differs from its expression (4.38%), kept as printed.
