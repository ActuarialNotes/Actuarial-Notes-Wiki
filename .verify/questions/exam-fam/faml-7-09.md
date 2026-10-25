---
target: questions/exam-fam/faml-7-09.md
created: 2026-10-23
---

## [F-001] wiki_link tags Woolhouse's Formula, which the solution does not use
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, wiki_link
- claim: wiki_link includes Concepts/Woolhouse's+Formula.
- evidence: SOA FAM-L sample solutions p.69 (sha256:9e7f7b03…), Question 7.9: the SOA values the monthly annuity with the UDD functions, ä^(12)_55:10 = α(12)ä_55:10 - β(12)(1 - 10E55) = 1.00020(8.0192) - 0.46651(0.40658) = 7.8311, and the stem (p.100) gives UDD. Woolhouse's formula is not used (it is used in Q7.7). Concepts/Fractional+Age+Assumption, also tagged, covers the method.
- source_rank: 1
- proposed_action: Drop Concepts/Woolhouse's+Formula from wiki_link (a tagging decision, left for the campaign's resolve run).
- applied: false
- fingerprint: d0913508fab8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.9, p.100, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.9, p.69, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 38,099.6; SOA key A, vault key A. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. Open minor F-001: the Woolhouse's Formula tag does not fit (UDD alpha/beta used); left for the resolve run.

## [F-001/R] Woolhouse's Formula tag removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-001
- status: resolved
- note: Maintainer's decision: the Woolhouse's Formula tag is replaced by the page for UDD fractional ages and α(m)/β(m). That page is Concepts/Fractional Age Assumption (the only concept page covering UDD; no page names α(m)/β(m)), which wiki_link already carried, so the replacement is the removal of Concepts/Woolhouse's+Formula and nothing is added. SOA Q7.9: booklet p.100 (UDD, item iii) and solutions p.69 (ä(12)55:10 = α(12)ä55:10 - β(12)[1 - 10E55] = 7.8311); 'Woolhouse' occurs in the FAM-L solutions only on p.42. This resolution closes the finding the caller asked to be recorded; F-001 already records it, so no duplicate finding was filed.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta re-check of a tag removal: git diff shows only the Woolhouse's Formula wiki_link line removed; SOA Q7.9 booklet p.100 (UDD, item iii) and solutions p.69 (ä(12)55:10 = α(12)ä55:10 - β(12)[1 - 10E55] = 7.8311) re-read in the cached PDFs; remaining wiki_link pages exist; validate_content.py clean
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.9, p.100, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.9, p.69, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Delta pass after the tag removal; confidence kept at high.
