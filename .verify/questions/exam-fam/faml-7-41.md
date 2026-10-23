---
target: questions/exam-fam/faml-7-41.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept without marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, the 49,202 display
- claim: The page reads "100,000v^5 = 0.95(6750)ä_5 = 100,000(0.78353) - ..." with no note.
- evidence: SOA FAM-L sample solutions p.82 (sha256:9e7f7b03…), Question 7.41: the SOA prints "100,000v^5 = 0.95(6750)ä_5| = 100,000(0.78353) - 0.95(6750)(4.54595) = ... = 49,202"; the first "=" should be a minus. The number 49,202 (C) is right. Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the line "(as printed)".
- applied: true
- fingerprint: ae18ba9c745d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "\text{ (as printed)}" after 0.95(6750)ä_5.

## [F-002] SOA printed numbering slip kept without marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, last given item
- claim: The stem numbers the interest-rate item "iv)" a second time, after v), with no note.
- evidence: SOA FAM-L sample questions p.125 (sha256:4aaf3469…), Question 7.41: the SOA prints the items i) ii) iii) iv) v) iv), the last being "i = 0.05". Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the second "iv)" "(as printed)".
- applied: true
- fingerprint: b4c17e5cfb52

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked "(as printed)" after the second "iv)".

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.41, p.125, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.41, p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 49,202 (4q75 = 0.0854 < 0.10 <= 5q75 = 0.1120; survivor loss 42,841); SOA key C, vault key C. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. SOA slips marked: "=" for "-" in the 49,202 line (F-001), duplicate "iv)" in the stem (F-002).
