---
target: Resources/Books/CIA Duration.md
created: 2026-09-25
---

## [F-001] Purpose and uses misattributed; MCT interest rate risk margin is the note's stated driver
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Why it appeared when it did; ## Where it is used
- claim: The note exists to measure the IFRS 17 asset-liability mismatch (liability on a liability-characteristic curve vs assets under IFRS 9, residual to equity or IFIE via the OCI option); duration is the input to FCT and ORSA, to the MCT market risk margin, and to the AA Report - which is why the syllabus tags it to C5.
- evidence: CIA PCFRC, Educational Note: Duration Considerations for P&C Insurers (August 10, 2023, Document 223126), https://www.cia-ica.ca/publications/223126e/ (PDF dl_file.php?p=38858&fid=17251), sha256 b8b49f0c35ec5af64b806fe4221ba32bf860035117b4fd36efd984eb36218f5a s.1 (p.4): 'This guidance supersedes the previous educational note published in 2017, and adapts the content ... to align to actuarial practice under IFRS 17.' Reasons duration is relevant: 'The MCT Guideline requires the calculation of estimated duration ... for purposes of the interest rate risk margin'; margin for investment return rates for valuation work not subject to IFRS 17; duration-matching liabilities to assets; modelling market risk. Sections 4-5 are organised around the MCT interest rate risk margin calculation ('MCT' on pp.4,6-10). Full-text search: 'FCT', 'financial condition', 'ORSA', 'Appointed Actuary', 'IFRS 9', 'mismatch', 'other comprehensive' each occur 0 times; 'OCI' once (p.9). The page leads with an IFRS 9 mismatch narrative the note does not contain and lists uses the note never mentions, while demoting the MCT, which is its main purpose.
- source_rank: 2
- proposed_action: Rewrite both sections from s.1 p.4 (MCT interest rate risk margin first; valuation margin for non-IFRS 17 work; duration matching; market-risk modelling). Needs authored prose.
- applied: false
- fingerprint: 380546c68463

## [F-002] Named technical points absent from the note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The technical points, bullets 2-4
- claim: Inflation-sensitive cash flows (bodily injury, care costs) mean a nominal duration overstates the hedge; asset vs liability durations on different curves are put on the same footing; duration does not capture non-parallel shifts or the illiquidity-premium component of the IFRS 17 curve.
- evidence: CIA PCFRC, Educational Note: Duration Considerations for P&C Insurers (August 10, 2023, Document 223126), https://www.cia-ica.ca/publications/223126e/ (PDF dl_file.php?p=38858&fid=17251), sha256 b8b49f0c35ec5af64b806fe4221ba32bf860035117b4fd36efd984eb36218f5a: full-text search finds 0 occurrences of 'inflation', 'non-parallel'/'parallel', 'illiquid', 'key rate'. On consistency the note says (s.4, p.8) 'Assumptions underlying the duration calculation would be consistent with those underlying the discounting calculation (e.g., timing of payments...)' - a liability-side consistency point, not asset-vs-liability curve reconciliation. Convexity is mentioned (p.6) and matches. Macaulay/modified/effective are covered (s.2 pp.4-6), with the note adding that for the MCT Macaulay 'is not a measure of duration accepted by regulators' and insurers may use modified or effective.
- source_rank: 2
- proposed_action: Remove or source the inflation, non-parallel and illiquidity claims; restate the consistency point per p.8.
- applied: false
- fingerprint: 61cee3dc13b8

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (Aug 2023, C1 C5, Excel illustrations assigned - match); frontmatter vs cover (Aug 10 2023, PCFRC, Doc 223126); outline from printed TOC and bookmark outline (agree), then page Contents diffed - all six headings match; full-text search of every named term (Macaulay, modified, effective, convexity, inflation, non-parallel, illiquid, fulfilment, FCT, ORSA, MCT, IFRS 9, OCI, mismatch); s.1 and key s.2/4 passages read; wiki links; Available-from URL fetched (200)
- sources_checked: CIA PCFRC, Educational Note: Duration Considerations for P&C Insurers (August 10, 2023, Document 223126), https://www.cia-ica.ca/publications/223126e/ (PDF dl_file.php?p=38858&fid=17251), sha256 b8b49f0c35ec5af64b806fe4221ba32bf860035117b4fd36efd984eb36218f5a; CIA Duration Excel illustrations, https://www.cia-ica.ca/publications/223126te/ (xlsx fetched, not reviewed); CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Contents list is accurate. The explanatory sections misstate why the note exists and where it is used (major F-001), and several technical claims do not appear in the note (minor F-002). Left in_review.
