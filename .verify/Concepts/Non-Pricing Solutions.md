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
