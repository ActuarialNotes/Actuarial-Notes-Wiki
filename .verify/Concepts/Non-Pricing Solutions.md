---
target: Concepts/Non-Pricing Solutions.md
created: 2026-10-31
---

## [F-001] Two details not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Reduce expenses' ('lower acquisition cost'); last bullet ('take a full term to earn in')
- claim: Non-pricing expense cuts include lower acquisition cost; underwriting and coverage changes act only as policies renew, so they take a full term to earn in.
- evidence: Werner Ch.14 p.263 (PDF p.275) gives reducing the marketing budget or staffing levels as expense examples; acquisition cost is not named. Neither Ch.13 p.256 nor Ch.14 pp.263-264 says how long a portfolio or coverage change takes to take effect; Werner says only that the actuary should adjust the projections and recalculate the indication. Both are plausible but unsourced.
- source_rank: 2
- proposed_action: Cite a source or drop the two phrases.
- applied: false
- fingerprint: 5c15aed22c98

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Ch.14's Non-Pricing Solutions section read first (PDF pp.275-276) with its Key Concepts (p.288: reduce expenses, reduce loss costs). Lead, formula and every bullet diffed: expense reduction (marketing budget, staffing; lowers fixed or variable expense); expected losses via portfolio change (loss reduction must exceed premium reduction), coverage level change (mold exclusion; equivalent to a rate increase), better loss control (WC medical management, return-to-work); promulgated or hard-to-get rates and retention concerns (Ch.13 p.256); catastrophe concentration (restrict new business, higher cat deductibles, reinsurance — Ch.6 p.99); re-projection and recalculation after the action; accepting a lower profit until rates can be raised (Ch.14 p.264). Both examples recomputed before reading the answers: P_I $623.29 (+7.5%), approved $597.40, V 18.8%, L $401.10 (-4.5%), mix $604.93 (+1.3%); non-renewal L $378.26, P $569.57, P_I $566.11 (-0.6%), segment LR 129%, fixed $38.04, P_I $570.27 (+0.1%, on rounded inputs). All reproduce.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 14 pp.263-264, 287-288 (PDF pp.275-276, 299-300), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 p.256 (PDF p.268), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.99 (PDF p.111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: One minor finding open for two unsourced phrases; everything else is the reading's.

## [F-002] 'Reduce expected losses in three ways' lists four
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- severity: nit
- status: open
- locus: bullet 'Reduce expected losses'
- claim: Reduce expected losses in three ways: (four sub-bullets follow).
- evidence: The page lists portfolio change, coverage reduction, loss control and claims handling. Werner Ch.14 pp.263-264 (PDF pp.275-276) gives the first two and adds loss control as one of other approaches; claims handling comes from App. D p.D-5 (PDF p.398). The count is wrong and no count is in the source.
- source_rank: 2
- proposed_action: Drop 'in three ways'.
- applied: true
- fingerprint: 7b57eafba571

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied: heading now reads 'Reduce expected losses:'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Changed claims-handling bullet diffed against App. D p.D-5 (Row 8: -5% 'lower losses attributable to the company's more stringent underwriting and claims handling practices'); framed as a cost reduction per Ch.14 p.263. Whole page re-read; example unchanged since this morning's pass.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 14 pp. 263-264, 287-288 (PDF pp. 275-276, 299-300); App. D p. D-5 (PDF p. 398), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Nit fixed. F-001 (minor, two unsourced phrases) is still open and unchanged.
