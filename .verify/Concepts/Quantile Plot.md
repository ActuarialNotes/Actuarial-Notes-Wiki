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

## [F-004] Predictive accuracy is comparative, not a pass/fail test
- entry_type: finding
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Accuracy is not narrowness'
- claim: A model whose predictions are too extreme fails the predictive-accuracy test.
- evidence: Goldburd et al. §7.2.1 p.77: criterion 1 'Predictive accuracy. How well each model is able to predict the actual pure premium in each quantile' — a comparison between models, not a test passed or failed. 'Too extreme' as glossed on the page (over-predicting the high end, under-predicting the low end) is the definition in Van Calster et al., BMC Medicine 17:230 (2019): 'estimated risks are too extreme, i.e., too high for patients who are at high risk and too low for patients who are at low risk'.
- source_rank: 2
- proposed_action: Say such a model scores poorly on predictive accuracy.
- applied: true
- fingerprint: 2977254558d9

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Restated in this run: 'scores poorly on predictive accuracy'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page against Goldburd §7.2-7.2.2: construction steps, equal-exposure buckets, holdout, the three criteria (accuracy, monotonicity with small reversals, vertical distance = lift), double lift chart; the new accuracy bullet against criterion 1 and the 'too extreme' gloss against Van Calster; example recomputed (1.42/0.68 = 2.09; 1.33 vs 1.42, about 7% under); rule 10 vs masii-an-019 (none of its quintile figures on the page)
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §7.2 and §7.2.1 'Simple Quantile Plots' incl. the three criteria, printed pp.76-78 (PDF pp.86-88), §7.2.2, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019), open access, PMC6912996, sections on overfitting and the calibration slope ('estimated risks are too extreme, i.e., too high ... at high risk and too low ... at low risk'), Europe PMC full-text XML sha256:c31e3eb24e490682a92af5c5ff1b197579a09122c867354392e9edce63c1ffaf — https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7
- note: Re-verified after the MAS-II G8 edit. F-004 (predictive accuracy is a comparison, not a pass/fail test) restated. 'Too extreme' is Van Calster's term from clinical calibration; its meaning on the page (over at the top, under at the bottom) is the paper's, and the consequence follows from Goldburd's criterion 1. Also linked from PCPA.
