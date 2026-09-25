---
target: Resources/Books/CIA IFRS 17 - Comparison.md
created: 2026-09-25
---

## [F-001] Structure omits examinable Section 9 (risk adjustment) and Appendix C
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: Structure list (ends at 8. Discounting)
- claim: Structure lists sections 1-8 only; no Section 9 and no appendices are named.
- evidence: CIA Educational Note, Comparison of IFRS 17 to Current CIA Standards of Practice (June 2022, doc 222094) PDF bookmark outline: '9. Risk adjustment for non-financial risk' (p.28) with 9.1 and 9.2 (9.2.1 current PfAD vs compensation, 9.2.2 diversification, 9.2.3 confidence level disclosure, 9.2.4 reinsurance held, 9.2.5 pass-through features), and 'Appendix C: Examples of service components in Canadian products' (p.37); also 8.3 'Reflecting financial risk' (p.26). The Fall 2026 6C outline (sha256:1bd4b2b8...) excludes only 3.2, 5.3, 7.2, 8.1.2 and Appendices A, B, D, so Section 9 and Appendix C are examinable. A candidate using this outline would not know Section 9 exists.
- source_rank: 1
- proposed_action: Add '9. Risk adjustment for non-financial risk' (9.1, 9.2.1-9.2.5), 8.3 under Discounting, and 'Appendix C - examples of service components (examinable)' to the Structure list. Adding sections is authoring, so left open.
- applied: false
- fingerprint: ca15353b2223

## [F-002] Excluded 5.3 and 7.2 listed as included topics alongside '(excluded)' markers
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: Structure items 5 and 7
- claim: 5 ... the PAA, the variable fee approach, (5.3 excluded) ...; 7 ... cash flows varying with financial risk, deferrable acquisition expenses (7.2 excluded)
- evidence: CIA Educational Note, Comparison of IFRS 17 to Current CIA Standards of Practice (June 2022, doc 222094) bookmark outline: 5.3 is 'Variable fee approach' (p.13) and 7.2 is 'Cash flows that vary with assumptions related to financial risk' (p.20). So the page named the excluded sections' own topics as if they were separate, included items. The syllabus exclusion list itself on the page is correct (matches the Fall 2026 outline verbatim).
- source_rank: 1
- proposed_action: Delete 'the variable fee approach,' from item 5 and 'cash flows varying with financial risk,' from item 7.
- applied: true
- fingerprint: 6ae3a7961b13

## [F-003] Comparison table says pre-IFRS 17 reinsurance was netted in presentation; the note says ceded liabilities were shown as assets
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: The comparison that matters for P&C, last row, left column
- claim: Reinsurance netted in presentation
- evidence: CIA Educational Note, Comparison of IFRS 17 to Current CIA Standards of Practice (June 2022, doc 222094) §8.1.1, PDF p.24: 'The ceded policy liabilities are shown as recoverable amounts (assets) on the entity's balance sheet, and as such they are not supported by invested assets.' The note's §9.2.4 / reinsurance discussion (text near 'non-performance', ~p.21) says only that the non-performance provision 'may be implicit in the liability net of reinsurance'. The row therefore misstates the pre-IFRS 17 presentation that it contrasts with IFRS 17.
- source_rank: 2
- proposed_action: Rewrite the left cell to say ceded liabilities were presented gross as reinsurance recoverable assets (with the non-performance provision often implicit in the net liability). Needs authored wording.
- applied: false
- fingerprint: bd52ee03fffb

## [F-004] Several comparison-table left-column claims do not appear in the note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: The comparison that matters for P&C, rows 3, 5, 6 (left column)
- claim: One liability for unpaid claims, plus unearned premium; Unit of account: the line of business; Profit emerges as earned premium less incurred loss
- evidence: CIA Educational Note, Comparison of IFRS 17 to Current CIA Standards of Practice (June 2022, doc 222094): the note's own current-practice statements are that P&C premium liabilities are the analogue of the LRC and 'the booked liability is the higher of UEP less DAC and the explicit valuation' (§5.2, PDF p.12), and that in Canada 'there is currently no CSM, there is no analogous requirement to identify groups of contracts. As a result, it is common to measure coverages separately' (§6.1, PDF p.14). 'line of business' occurs once, in the §9 diversification table; 'earned premium' does not occur except in 'unearned premium'. The rows are unsourced characterisations, and row 3 omits the premium-deficiency (explicit valuation) test.
- source_rank: 2
- proposed_action: Replace the three left-column cells with the note's own wording (premium liabilities = max(UEP less DAC, explicit valuation); no group-of-contracts requirement, coverages measured separately), or cite a source for them.
- applied: false
- fingerprint: f9781df4f94d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-002
- status: resolved
- note: Deleted the two mis-attributed topics; items 5 and 7 now list only the included subsections plus the exclusion markers.

## [C-001] Locator correction for F-003 evidence
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- locus: F-003
- note: F-003's evidence cites the 'net of reinsurance' non-performance passage as '§9.2.4 ... ~p.21'. It is in §7.1 (comparison of probability-weighted cash flows, 'Risk of non-performance by the issuer of the reinsurance contract' bullet), PDF p.20. The §8.1.1 quotation (PDF p.24) is correctly located.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus exclusion diff; structure built from PDF bookmark outline then compared; section attribution; full-text search of comparison-table claims; wiki-link check; frontmatter vs title page
- sources_checked: CIA Educational Note, Comparison of IFRS 17 to Current CIA Standards of Practice (June 2022, doc 222094), https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf sha256:dad0c798ecf3320c7887ed8bdb2820811617951a5c94c1ede6b05da9706560db — bookmark outline, §§5.2, 6.1, 7.1, 8.1.1, 9; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Exclusion list (3.2, 5.3, 7.2, 8.1.2, App. A, B, D), June 2022 date and objective C1 match the Fall 2026 outline verbatim. Mis-attributed 5.3/7.2 topics deleted (F-002, resolved). Open: F-001 major (Section 9 risk adjustment and App. C, both examinable, missing from the structure), F-003 major (reinsurance 'netted' contradicts §8.1.1), F-004 minor (unsourced table cells). Not verified while the two majors stand.
