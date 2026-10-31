---
target: Concepts/Commercial Lines Rating.md
created: 2026-10-31
---

## [F-001] Risk transfer said to reduce the insurer's risk charge; Werner says a large deductible may need a larger one
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: major
- status: open
- locus: 'Further points', last bullet
- claim: Each step transfers more risk back to the insured, 'and each therefore reduces the insurer's risk charge'.
- evidence: Werner Ch.15 p.303 (PDF p.315), large deductible pricing, 'Risk margin': 'losses above a large deductible are expected to be more uncertain than losses below the deductible. As a result, the profit margin may need to be adjusted accordingly to reflect the increased risk being assumed by the insurer'; the worked example (p.304) adds 'an additional risk margin of 10% of excess losses for policies with a deductible'. The reading contradicts the clause for the mechanism the page puts last.
- source_rank: 2
- proposed_action: Delete the contradicted clause.
- applied: true
- fingerprint: 905dbcb603f7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied: the clause 'and each therefore reduces the insurer's risk charge' deleted; the bullet keeps the credit-exposure point, which Werner p.303 supports for large deductibles (credit risk on deductible reimbursements, rarely fully collateralized).

## [F-002] Unsourced ordering, SIR and stacking claims
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'The mechanisms, in increasing order of how much risk the insured retains'; large deductible bullet; stacking-order bullet; last bullet
- claim: The four mechanisms rank by risk retained; SIR programmes and 'statutory paper'; Manual → mods → standard premium → premium discount → retro/deductible order; every step transfers risk.
- evidence: Werner Ch.15 (PDF pp.301-323) groups the mechanisms as manual rate modification (experience, schedule) and rating for large risks (loss-rated composite, large deductible, retrospective), with no ranking by risk retained; schedule rating transfers no risk. 'self-insured retention' occurs zero times in Werner; 'statutory paper' likewise. Werner defines standard premium as 'before consideration of the retrospectively rated plan and any premium discount' (p.308, PDF p.320) but gives no order between premium discount and retro adjustment. Stated as fact with no source.
- source_rank: 2
- proposed_action: Restate to Werner's two groups, or cite a source for the ranking, SIR and the stacking order.
- applied: false
- fingerprint: b4ab8a2a0a41

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Ch.15 read in full before re-reading the page. Experience rating (credibility weighting of actual vs expected, eligibility by premium size), schedule rating (credits/debits for characteristics not in the manual rate, filed guidelines, overall maximum, double counting with experience rating), loss-rated composite rating (implicitly 100% credible, single proxy exposure, audited final premium, no experience mod applied), large deductible considerations and retrospective rating (min/max, standard premium definition) checked bullet by bullet. Example 1 recomputed: $50,000 x 1.15 x 0.95 = $54,625, +9.25%; standard premium as the retro base matches Werner's basic premium and min/max formulas. Example 2's size-based recommendations are consistent with Werner's eligibility rules (experience rating by premium size; loss rating above a threshold; large deductibles and retro for large risks). Wiki-links resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 15 pp.289-311 (PDF pp.301-323), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: One major contradiction fixed (risk charge). One minor finding open for claims the reading does not make (ranking, SIR, stacking order).
