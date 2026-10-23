---
target: questions/exam-fam/faml-7-34.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept without marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, all three displays
- claim: The page writes the unknown as _{50.75}V (three times) with no note; the question asks for _{10.75}V.
- evidence: SOA FAM-L sample solutions p.81 (sha256:9e7f7b03…), Question 7.34: the SOA prints "50.75V" in the recursion, the numerical line and the result "50.75V = 8,390" (age 50.75, not time 10.75). The stem (p.122) asks for 10.75V. The value 8,390 (D) is right. Kept as printed and marked at each occurrence.
- source_rank: 1
- proposed_action: Mark each _{50.75}V "(as printed)".
- applied: true
- fingerprint: 5675552f9658

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "\text{ (as printed)}" after each of the three _{50.75}V.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.34, p.122, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.34, p.81, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 8,390.4; SOA key D, vault key D. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. SOA slip 50.75V marked at each occurrence (F-001).
