---
target: Concepts/Double Lift Chart.md
created: 2026-10-18
---

## [F-001] Example's conclusion reverses which risks the losing model over- and under-predicts
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: example 'Reading a Double Lift Chart', answer para 2
- claim: 'the model that misses it is under-predicting the good risks and over-predicting the bad.'
- evidence: In the example's own numbers the current (losing) model predicts 1.02 against an actual 0.78 in the leftmost bucket (the good risks: over-prediction) and 1.05 against an actual 1.31 in the rightmost (the bad risks: under-prediction). Goldburd §7.2.2 pp.78-79: the first decile 'contains the risks that the model thinks are best relative to the current plan. As it turns out, the model is correct.' Rank 5 recomputation falsifies the sentence.
- source_rank: 5
- proposed_action: Swap to 'over-predicting the good risks and under-predicting the bad'.
- applied: true
- fingerprint: 2cf3390d13c1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Sentence corrected to 'over-predicting the good risks and under-predicting the bad', matching the example's 1.02 vs 0.78 and 1.05 vs 1.31.

## [F-002] Formula omits the actual line and normalizes by the actual mean
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: formula block
- claim: Plot ŷ̄^A/ȳ and ŷ̄^B/ȳ per bucket.
- evidence: Goldburd §7.2.2 step 4 p.78: within each bucket calculate the Model A average predicted pure premium, the Model B average predicted pure premium and the actual average pure premium, and 'for each of those quantities, divide the quantile average by the overall average'; step 5 plots all three.
- source_rank: 2
- proposed_action: Restate the formula to the three quantities, each over its own overall average; restate the normalization bullet the same way.
- applied: true
- fingerprint: 67897e97db21

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Formula now plots ŷ̄^A_b/ŷ̄^A, ŷ̄^B_b/ŷ̄^B and ȳ_b/ȳ per bucket; normalization bullet says each of the three is divided by its own overall average.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: construction steps, sort ratio, bucket reading and winner rule against Goldburd §7.2.2 pp.78-79; holdout requirement against §7.2 p.76; example recomputed; links resolved
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified after F-001 and F-002. Goldburd's alternate percent-error form ((predicted)/(actual) − 1, flatter line at 0 wins, p.79) is not on the page; an omission a writer may add, not an error.
