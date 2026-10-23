---
target: questions/exam-fam/faml-3-13.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, e_[58]+2 chain
- claim: Explanation gives 2210/3548 x 1/(2210/3904) = 3904/3549 = 1.100338 with no marker.
- evidence: SOA FAM-L solutions p.15 (Q3.13) prints 3904/3549; the product is 3904/3548 = 1.100338 (3904/3549 = 1.10003), l[58]+2 = 3,548 on booklet p.22. Key B unaffected. Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the printed denominator '(as printed)'.
- applied: true
- fingerprint: 68b5a30ea91b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in place; the SOA's figures are kept as printed (P1), the key is unaffected.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute from the stem before reading the key; stem, table cells, notation and options diffed against the 110-dpi booklet page image; keyed letter against the SOA key; explanation diffed line by line against the rendered SOA solution page (method, figures, arithmetic); source line placed above the options, none on option E; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.13, p.22 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.13, p.15 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.22; key B is the SOA's (solutions p.15); the explanation follows the SOA's solution with its figures. Blind: e60 = 1 = (2,210/3,904)(1 + e61) gives e61 = 0.76652, e°61 = 1.26652 (UDD); e°[58]+2 = 0.81144 + (2,210/3,548)(1.26652) = 1.6003 (B). The SOA's 3904/3549 is a printed slip for 3904/3548 (its 1.100338 uses 3,548).
