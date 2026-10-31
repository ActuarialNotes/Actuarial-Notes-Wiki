---
target: Resources/Books/Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988).md
created: 2026-10-31
---

## [F-001] Risk consideration compressed past the source's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: nit
- status: open
- locus: ## III Considerations, Risk sub-bullet
- claim: The charge for random variation is 'reflected in the underwriting profit provision'.
- evidence: SOP p.4, Risk: the random-variation charge 'should be reflected in the determination of the appropriate total return consistent with the cost of capital and, therefore, influences the underwriting profit provision'. The page dropped the cost-of-capital step and turned 'influences' into 'reflected in'. The systematic-variation half (contingency provision) matches.
- source_rank: 2
- proposed_action: Restore the source's cost-of-capital step.
- applied: true
- fingerprint: a4f4c23abf40

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied: the sub-bullet now reads 'reflected in the appropriate total return consistent with the cost of capital and so influencing the underwriting profit provision', SOP p.4's own steps.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Outline built from the document first (pp.1-5: purpose, I Definitions, II Principles, III Considerations, IV Conclusion), then diffed against the page heading by heading; the PDF has no bookmark outline, and the printed four-part list on p.1 matches the body. All 18 considerations (Exposure Unit … Actuarial Judgment) present in the source's order, none extra; the 9 cost definitions and the profit/contingency definition; Principles 1-4 and the four criteria; rescission (Dec 2020) and reinstatement (May 2021) notes from every page footer. Scope callout diffed against the Fall 2026 Exam 5 content outline (p.4 readings 'CAS Ratemaking Principles'; p.6 table: Statement of Principles…, May 1988, A4, A16) and the exam page's Source Material (A4, A16). Frontmatter (title, CAS, 1988, Available from URL fetched, 200, PDF) checked; resource_lint 0 errors; wiki-links all resolve.
- sources_checked: CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; rescinded Dec 2020, reinstated May 2021), pp.1-5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; CAS, Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F), p.4 (A16 and the domain A readings) and p.6 (reading table: CAS Ratemaking Principles, A4, A16), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: One nit (Risk sub-bullet compression) fixed. Omissions not filed: the Definitions' sentence on marketing goals, competition and legal restrictions and the remark that the principles apply to other risk transfer mechanisms are summarised in the lead's scope sentence rather than bulleted, which is a summary, not a missing division.
