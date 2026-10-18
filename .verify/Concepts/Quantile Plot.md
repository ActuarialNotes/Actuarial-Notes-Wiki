---
target: Concepts/Quantile Plot.md
created: 2026-10-18
---

## [F-001] Two read-offs instead of the monograph's three criteria; lift gloss muddled
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 1 and 3
- claim: 'Two things are read off it: monotonicity … and calibration'; the spread is lift, 'how much better than the average rate the extremes are priced'.
- evidence: Goldburd §7.2.1 p.77 gives three criteria for the winning model: predictive accuracy, monotonicity (small reversals are okay) and vertical distance between the first and last quantiles, 'also called lift', which 'indicates that the model is able to maximally distinguish the best and worst risks'.
- source_rank: 2
- proposed_action: Restate both bullets to p.77; say two models are compared on their two quantile plots (steps 5-6).
- applied: true
- fingerprint: 3bf2865279a7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Bullets restated to Goldburd p.77's three criteria and its gloss of lift; holdout bullet now notes two models are compared on two quantile plots (steps 5-6), a double lift chart directly.

## [F-002] Example calls five buckets deciles and plots loss ratios
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: example stem
- claim: 'Five equal-exposure deciles … give actual loss ratios …'
- evidence: Goldburd p.77: five buckets are quintiles, ten deciles. A quantile plot plots pure premium (loss cost); plotting loss ratio is the loss ratio chart (§7.2.3), which plots actual loss ratio only. The predicted values average 1.00 (sum 5.00), consistent with loss costs relative to the average prediction, as Goldburd's Figure 22 is drawn.
- source_rank: 2
- proposed_action: Restate to 'quintiles' and 'actual loss costs, relative to the average prediction'.
- applied: true
- fingerprint: 9f9ef666b1b0

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Stem restated: quintiles; actual loss costs relative to the average prediction. Answer recomputed unchanged (1.42/0.68 = 2.09; 1.42/1.33 = 1.068).

## [F-003] Unsourced glosses
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'equal exposure'; example answer last sentence
- claim: Equal-exposure buckets mean 'each bar carries the same credibility'; the top-bucket miss is 'the usual pattern when a model is capped or the tail is thin' and points at a further variable or a higher relativity.
- evidence: Goldburd §7.2.1 says only that each quantile has the same volume of exposures, and draws no such diagnosis from a top-bucket miss.
- source_rank: 2
- proposed_action: Delete both glosses.
- applied: true
- fingerprint: 97bf35b8d3e2

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Both glosses deleted.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: construction steps and criteria against Goldburd §7.2.1 pp.77-78 and §7.1 p.76 (holdout, equal-weight buckets); example recomputed; links resolved
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified after F-001 to F-003.
