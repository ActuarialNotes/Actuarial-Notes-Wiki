---
target: Resources/Books/CIA Appointed Actuary.md
created: 2026-09-25
---

## [F-001] Presents 'rely with disclosure' as an alternative to taking responsibility; the note equates relying with reporting with reservation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The answer, bullet 2 (Taking responsibility versus relying)
- claim: For each item set by others the actuary decides whether to take responsibility for it ... or to rely on it with disclosure.
- evidence: Source §2, PDF p.7 (printed p.6): 'the AA does not often "rely" on the work of others, as relying on the work of others implies using but not taking responsibility for that work, leading to a report with reservation. To report without reservation, the AA must be able to use and take responsibility for any accounting policies or methods or assumptions set by others.' Also SOP 1510.06 quoted there: if the actuary does not take responsibility, the actuary reports with reservation. There is no third 'rely with disclosure' route distinct from reservation; the page's next bullet then describes reservation as a separate case for items the actuary 'cannot accept', which compounds the error.
- source_rank: 2
- proposed_action: Rewrite bullet 2 so the binary is use-and-take-responsibility (report without reservation) versus use-without-taking-responsibility = rely (report with reservation, SOP 1510.06), and merge bullet 3 accordingly. Requires new prose, so left for an author.
- applied: false
- fingerprint: 5f56cdaa4e7d

## [F-002] Section 4 described as covering MCT input; the note excludes the MCT from scope
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: The answer, bullet on §4
- claim: §4 covers work outside IFRS 17's scope, which for a P&C insurer includes the actuarial input to the MCT.
- evidence: Source Introduction, PDF p.6 (printed p.5): 'The following items are not considered in this educational note: ... The impact of IFRS 17 on financial condition testing (FCT); Life Insurance Capital Adequacy Test/Minimum Capital Test'. §4 (PDF p.13-14) covers valuations not in accordance with IFRS 17 (other accounting standards, engagement terms, the P&C 'Valuation Work Not Subject to IFRS 17' EN); 'MCT' occurs nowhere in the note.
- source_rank: 2
- proposed_action: Delete the MCT clause (transcription-level deletion).
- applied: true
- fingerprint: 284e5dd5f959

## [F-003] OCI election listed among items set by management; not in the note's list
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: The problem the note addresses, list of management-set items
- claim: IFRS 17 hands several of them to management: ... the PAA election, the OCI election, the coverage unit basis ...
- evidence: Source §2, PDF p.8-9 (printed p.7-8) lists examples of items that may be set by others: discount rates, contract classification, contract boundary, coverage units, level of aggregation, RA, directly attributable expenses, deferred acquisition expenses, PAA eligibility, PAA accounting policy choices, VFA, reinsurance held. The OCI option is not among them; the only mention of other comprehensive income (PDF p.12) is as a financial-statement presentation item in §3.
- source_rank: 2
- proposed_action: Delete 'the OCI election' from the list.
- applied: true
- fingerprint: 873dadb0c501

## [F-004] 'What has not changed' lists a duty to report to the board, which the note does not state
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: The answer, bullet 1 (What has not changed)
- claim: What has not changed: the statutory appointment, the duty to report to the board and to OSFI, ...
- evidence: Source §1, PDF p.6-7: unchanged items are the reserved role under the ICA/QIA with formal appointment, the opinion on policy liabilities in accordance with accepted actuarial practice, use and take responsibility for others' work, and the formal report to the regulator per OSFI's Memorandum. The word 'board' occurs in the note only as 'Actuarial Standards Board' and 'International Accounting Standards Board'. (The FCT item is defensible: the note says FCT is out of scope because the related SOP did not change.)
- source_rank: 2
- proposed_action: Delete 'to the board and' so the bullet says duty to report to OSFI.
- applied: true
- fingerprint: 4e37c76ca58b

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-002
- status: resolved
- note: Deleted the MCT clause; the §4 bullet now says only that it covers work outside IFRS 17's scope, as the source does.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-003
- status: resolved
- note: Deleted 'the OCI election' from the management-set list; remaining items (aggregation, boundary, PAA, coverage units, accounting policies) all appear in the source's §2 list.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-004
- status: resolved
- note: Deleted 'to the board and'; bullet now reads duty to report to OSFI, matching the source's formal report to the regulator.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (Dec 2022, C1, no exclusions); contents table vs PDF bookmark outline and memo structure; full-text search of asserted terms; wiki-link check; frontmatter vs title page
- sources_checked: CIA Educational Note, Role of the Appointed Actuary Under IFRS 17 (Dec 2022, doc 222174), §§Intro-4 + Appendix, https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Role_of_the_Appointed_Actuary_Under_IFRS_17.pdf sha256:cef090fa90c49605ee6cc51e4bfb05243e192524bab1769762accf68d13f5e13; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Contents table matches the bookmark outline exactly (Intro, 1, 2, 2.1, 2.2, 3, 4, Appendix case studies); date, doc and objective C1 match the outline. Three minor unsupported clauses deleted (F-002..F-004). Left in_review, not verified, because F-001 (major: 'rely with disclosure' presented as a route distinct from reservation) is open and needs authored prose.
