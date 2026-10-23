---
target: questions/exam-astam/astam-2023s-q3.md
created: 2026-10-23
---

## [F-001] SOA rounding inconsistency for X-bar_2 not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation, final line
- claim: Part c uses 0.35455 for X-bar_2 where part b printed 0.35454, with no note.
- evidence: Solutions PDF p.8: (b)(i) prints X-bar_2 = 39/110 = 0.35454, (c) prints 0.7906 x 0.35455. 39/110 = 0.354545. Listed in A.6. Result 0.33173 reproduced by recompute (0.331734).
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: c9050e9ebe0a

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
- sources_checked: SOA Exam ASTAM Spring 2023 (April 26, 2023), question booklet, Q3, pp.5-6, sha256:fc23b48a1dbfd1d9c85380d5a3605927ba53d90641d5dcba1ab238bf3e02abaf — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-astam.pdf; SOA ASTAM April 2023 Model Solutions, Q3, pp.7-9, sha256:ac32f8885c3d0e8456bb4edec83c8bf8a89243d21bd6ddaa232842c22d3640a3 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-astam.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: v 0.5014, a 0.017213, P 0.33173, posterior 0.8604, Bayes 0.32665. 1 SOA printed slip(s) marked '(as printed)'.
