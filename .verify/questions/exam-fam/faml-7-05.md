---
target: questions/exam-fam/faml-7-05.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept without marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, recursive 4.5V line
- claim: The recursive line reads (1,405.08 + 647.16)(1.03)^0.5 with no note, although the net premium is 647.46.
- evidence: SOA FAM-L sample solutions p.66 (sha256:9e7f7b03…), Question 7.5: the SOA prints "(1,405.08 + 647.16)(1.03)^0.5 - 0.02281(10,000)/(1.03)^0.5 over 1 - 0.02281 = 1,902"; the stem (p.97) and the first method use 647.46. With 647.46 the line gives 1,901.8, so the slip does not move the answer (E). Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark 647.16 "(as printed)".
- applied: true
- fingerprint: 3294c05acf17

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "\text{ (as printed)}" after 647.16 in this session; the figure is the SOA's and is kept.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.5, p.97, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.5, p.66, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 1,901.8; SOA key E, vault key E. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. SOA slip 647.16 marked (as printed) (F-001).
