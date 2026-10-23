---
target: questions/exam-fam/faml-3-05.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, constant-force q line
- claim: Explanation divides by 99.999 with no marker.
- evidence: SOA FAM-L solutions p.12 (Q3.5) prints the denominator as 99.999; the table's l60 is 99,999 (booklet p.16) and the printed result 0.276716 = 27,671.3/99,999. A decimal-point slip; key E unaffected. Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the printed denominator '(as printed)'.
- applied: true
- fingerprint: 070dc394ae4d

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.5, p.16 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.5, p.12 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.16; key E is the SOA's (solutions p.12); the explanation follows the SOA's solution with its figures. Blind: UDD a = (62,221.6 - 34,444.1)/99,999 = 0.277778; constant force l63.4 = 61,977.19, l65.9 = 34,305.86, b = 0.276716; 100,000(a - b) = 106.2 (E). The SOA's denominator 99.999 is a printed slip for 99,999 (its 0.276716 uses 99,999).
