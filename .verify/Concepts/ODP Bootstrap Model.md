---
target: Concepts/ODP Bootstrap Model.md
created: 2026-10-30
---

## [F-001] Negative-column bullet names the wrong device as failing
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- severity: minor
- status: open
- locus: Practical adjustments, 'A negative column' sub-bullet, first sentence
- claim: When a whole development column sums negative the GLM has no solution even with $\sqrt{|m|}$.
- evidence: Shapland (2016) §4.1, PDF p.28 (printed 20): with the modified log-link (4.1) — ln q for q>0, 0 for q=0, -ln|q| for q<0 — 'individual negative values are only an issue if the total of all incremental values in a development column is negative, as the GLM algorithm will not be able to find a solution in that case.' The sqrt(|m|) is the residual modification (4.4)-(4.5) on PDF p.29, not the GLM fit. The rest of the sub-bullet matches (4.2)-(4.3): q+ = q - psi with psi the largest negative, m = m+ + psi.
- source_rank: 2
- proposed_action: Name the modified log link instead of sqrt(|m|).
- applied: true
- fingerprint: 3a6222f35b28

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- resolves: F-001
- status: resolved
- note: Restated to Shapland's words: 'even with Shapland's modified log link, which takes $-\ln|q|$ for a negative value' (eq. 4.1, PDF p.28).

## [F-002] Sparse-row sentence overstates and drops Shapland's context
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- severity: minor
- status: open
- locus: Practical adjustments, 'A sparse row' sub-bullet
- claim: An accident year with thin data, often the first row, when the product was first written, can be removed ...
- evidence: Shapland (2016) §4.1.1, PDF p.30 (printed 22), in recalibrating for negative incremental values: 'it may be from the first row in your triangle, which was the first year the product was written, and therefore exhibit sparse data with negative incremental amounts. One option is to remove this row from the triangle if it is causing extreme results and does not improve the parameterization of the model.' Shapland gives the first row as an example ('may be'), not 'often', and the context is sparse data with negative incrementals.
- source_rank: 2
- proposed_action: Restate: sparse data and negative incremental values, 'for example' the first row.
- applied: true
- fingerprint: c4a3f8c2dec5

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- resolves: F-002
- status: resolved
- note: Restated to Shapland §4.1.1: 'An accident year with sparse data and negative incremental values, for example the first row when it was the first year the product was written, can be removed from the triangle if it causes extreme results and does not improve the model's parameterization.'

## [F-003] Mean-unpaid sentence states as a diagnostic what Shapland gives as the reason for one
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- severity: minor
- status: open
- locus: Using the output, second sentence
- claim: The mean unpaid should grow from the oldest accident year, which typically has only a few incremental payments left, to the most recent, and the standard errors should follow its size.
- evidence: Shapland (2016) §5.5.1, PDF pp.49-50 (printed 41-42): 'the standard error should increase when moving from the oldest years to the most recent years, as the standard errors (value scale) should follow the magnitude of the mean of unpaid estimates'; and 'the oldest accident year typically has only a few incremental payments remaining, or even just one'. Shapland's test is on the standard errors, with the growing mean as its reason; the page's next sentence then repeated the standard-error test.
- source_rank: 2
- proposed_action: Merge into one sentence that gives the standard-error test with the growing mean as its reason.
- applied: true
- fingerprint: 2bdd70d785bd

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- resolves: F-003
- status: resolved
- note: Restated: 'Standard errors should rise from old to recent years, because they follow the size of the mean unpaid, which grows from the oldest accident year, typically with only a few incremental payments left, to the most recent. CoVs should fall from old to recent years;' — Shapland §5.5.1's test, its reason, and his remark on the oldest year.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-bs
- date: 2026-10-30
- status_set: in_review
- checks_run: delta check of commit 62d997ba: the six new Practical-adjustments sub-bullets and the new Using-the-output sentence read sentence by sentence against Shapland fetched this session; eq. 4.2-4.3 sign convention checked (q+ = q - psi, m = m+ + psi); three restatements (F-001..F-003); no question numbers or wording on the page (rule 10)
- sources_checked: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph No. 4, 2016), §4.1 eq. 4.1-4.3 and §4.1.1 (PDF pp.28-30), §4.2 (PDF p.31), §4.5 (PDF pp.32-33), §4.7-4.7.2 (PDF pp.35-37), §5.5.1 (PDF pp.49-50); printed = PDF - 8, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf
- note: The added text now says what Shapland says. The page has never had a full verified pass (unverified, no sources, no prior log), and the rest of it (definition, steps, assumptions, variants, tested results, the worked example) was not checked in this pass, so it stays in_review rather than verified.
