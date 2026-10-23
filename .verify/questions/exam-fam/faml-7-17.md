---
target: questions/exam-fam/faml-7-17.md
created: 2026-10-23
---

## [F-001] Transcriber normalised the SOA's printed premium symbol
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, first display (variance ratio)
- claim: The ratio formula writes (1 + P/d)^2 in numerator and denominator.
- evidence: SOA FAM-L sample solutions p.73 (sha256:9e7f7b03…), Question 7.17, read at 300 dpi: the SOA prints a lowercase italic p in both factors, (1 + p/d)^2. Lowercase p is the survival-probability symbol elsewhere in the set, so it is a printed slip for the premium P; the factor cancels and the ratio 1.018 (D) is unaffected. Restored as printed with a marker.
- source_rank: 1
- proposed_action: Restore lowercase p as printed and mark "(as printed)".
- applied: true
- fingerprint: c329a01d46e3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Restored the SOA's lowercase p in both factors and added "\text{ (as printed)}" after the ratio.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.17, p.106, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.17, p.73, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 1.0182; SOA key D, vault key D. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. SOA lowercase p restored and marked (F-001).
