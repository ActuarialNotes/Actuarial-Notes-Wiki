---
target: questions/exam-fam/faml-6-49.md
created: 2026-10-23
---

## [F-001] wiki_link names a method the question does not use
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, wiki_link: Concepts/Woolhouse's+Formula
- claim: The question is tagged Concepts/Woolhouse's Formula.
- evidence: Q6.49's stem (FAM-L sample questions p.88) gives 'Deaths are uniformly distributed over each year of age', and the SOA solution (p.59) values the monthly annuity by the UDD approximation alpha(12)ä40:20 - beta(12)(1 - 20E40) = 12.700625. Woolhouse's formula is a different approximation (Concepts/Woolhouse's Formula.md) and is not used; Q6.32, which uses the same UDD method, carries no Woolhouse tag. The tag sends a student to the wrong method for this question; Fractional Age Assumption (already tagged) is the one that fits.
- source_rank: 1
- proposed_action: Maintainer review: drop the Woolhouse's Formula tag (or replace it with an m-thly annuity concept page if one exists). Topic and tag choices await the maintainer's review per docs/content-plan.md 4b; not changed here.
- applied: false
- fingerprint: 643915563527

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; options distinct, no source-line debris on option E; wiki_link targets and topic page exist; validate_content.py clean; every SULT value the explanation cites found in the FAM tables
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.88, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.59, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem and options match booklet p.88; explanation matches the SOA solution p.59 in method and figures, arithmetic resolves; answer C equals the SOA key. Recompute: ä(12)40:20 = alpha(12)ä40:20 - beta(12)(1-20E40) = 12.7006; G = (100,000(i/delta)A40 + 200)/(0.96 x 12.7006) = 1033.9, /12 = 86.16 (C). Open minor F-001: the Woolhouse's Formula tag does not fit the UDD method (maintainer's call).

## [F-001/R] Woolhouse's Formula tag removed
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-001
- status: resolved
- note: Maintainer's decision: the Woolhouse's Formula tag is replaced by the page for UDD fractional ages and α(m)/β(m). That page is Concepts/Fractional Age Assumption (the only concept page covering UDD; no page names α(m)/β(m)), which wiki_link already carried, so the replacement is the removal of Concepts/Woolhouse's+Formula and nothing is added. SOA Q6.49: booklet p.88 (deaths uniformly distributed, item v) and solutions p.59 (ä(12)40:20 = α(12)ä40:20 - (1 - 20E40)β(12) = 12.700625, page image read); 'Woolhouse' occurs in the FAM-L solutions only on p.42. This resolution closes the finding the caller asked to be recorded; F-001 already records it, so no duplicate finding was filed.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta re-check of a tag removal: git diff shows only the Woolhouse's Formula wiki_link line removed; SOA Q6.49 booklet p.88 (deaths uniformly distributed, item v) and solutions p.59 (ä(12)40:20 = α(12)ä40:20 - (1 - 20E40)β(12) = 12.700625, page image read) re-read in the cached PDFs; remaining wiki_link pages exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.88, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.59, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Delta pass after the tag removal; confidence kept at high.
