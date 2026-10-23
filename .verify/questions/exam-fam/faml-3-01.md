---
target: questions/exam-fam/faml-3-01.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, final two lines
- claim: Explanation gives (74,739 - 65,494)/79,249 = 0.11679 and 1000 x = 116.8 with no marker.
- evidence: SOA FAM-L solutions p.10 (Q3.1) prints 0.11679 and 116.8. 9,245/79,249 = 0.11666, so 1000 x = 116.7 (blind recompute with unrounded l's: 116.65). Key B (117) unaffected. Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the two printed figures '(as printed)'.
- applied: true
- fingerprint: f1bdee318a7a

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.1, p.13 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.1, p.10 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.13; key B is the SOA's (solutions p.10); the explanation follows the SOA's solution with its figures. Blind (constant force): l[60]+0.75 = 79,248.8, l[60]+2.75 = 74,738.9, l65.75 = 65,494.3; (74,738.9 - 65,494.3)/79,248.8 = 0.11665, so 1000 x = 116.7 (B). The SOA prints 0.11679 / 116.8 from the same rounded l's (9,245/79,249 = 0.11666): a printed slip, key unaffected.
