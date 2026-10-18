---
target: Concepts/Predictive Accuracy.md
created: 2026-10-18
---

## [F-001] Lift bullet and example part (c) use the marketing definition of lift
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: Discrimination bullet '[[Lift]]'; example 'Scoring Ten Claims Three Ways' part (c)
- claim: Lift is 'the response rate in the top-scored fraction divided by the overall rate'; example (c) computes lift in the top 20% as (1/2)/(3/10) = 1.67.
- evidence: Goldburd §7.2.1 p.77 and Salis §3.1 p.4 define lift as the vertical distance between the actual results in the first and last quantiles, usually their ratio Y_Q/Y_1 in insurance. Neither reading defines a top-fraction response-rate lift ('response rate' is not in the monograph).
- source_rank: 2
- proposed_action: Restate the bullet to Goldburd/Salis; delete part (c) and its answer, retitle 'Two Ways'.
- applied: true
- fingerprint: 33919eaddcfc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Bullet restated to Goldburd §7.2.1/Salis §3.1; part (c) and its answer deleted, title now 'Scoring Ten Claims Two Ways'.

## [F-002] Gini = 2·AUROC − 1 stated without the normalization the monograph requires
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: formula block; Discrimination bullet '[[Gini Index|Gini index]]'; example part (b)
- claim: Gini = 2·AUROC − 1 for a binary classifier.
- evidence: Goldburd §7.3.1 p.85 and footnote 17: 'the AUROC is equal to 0.5 × normalized Gini + 0.5, where normalized Gini is the ratio of the model's Gini index to the Gini index of the hypothetical "perfect" model'. The monograph's Gini (§7.2.4 p.81, and for a logistic model §7.3 p.82) is twice the area between the Lorenz curve and the line of equality, unnormalized; for a binary target with event rate p a perfect model's Gini is 1 − p, so Gini = (2·AUROC − 1)(1 − p), not 2·AUROC − 1. Recomputed on Predictive Accuracy's own ten-claim example (p = 0.3): trapezoid area under the Lorenz curve 0.25, Gini 0.50; perfect Gini 0.70; normalized 0.714 = 2(0.857) − 1. Salis (pp.4-7) computes the Gini for lift unnormalized by the trapezoid rule.
- source_rank: 2
- proposed_action: Restate to Goldburd fn 17: AUROC = 0.5 × normalized Gini + 0.5; label example (b)'s 0.714 'normalized Gini'.
- applied: true
- fingerprint: 4af1235eb6b0

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Formula block now AUROC = 0.5 × normalized Gini + 0.5 (Goldburd fn 17); bullet defines the normalized Gini and says, with §7.3.1 p.85, the two are not separate validation metrics; example (b) labelled normalized Gini (0.714, recomputed).

## [F-003] AUROC claimed for a pure-premium model
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Same Gini, Different Calibration', answer para 1
- claim: Models A and B 'have identical Gini, AUROC and lift'.
- evidence: The models predict pure premium. Goldburd §7.3-7.3.1 (pp.81-85) defines the ROC curve and AUROC for logistic (binary) models via a discrimination threshold; ISLR §4.4.2 likewise for classifiers. Gini (§7.2.4) and lift (§7.2.1) apply to the pure-premium models and are identical because B = 1.1·A sorts into the same buckets.
- source_rank: 2
- proposed_action: Delete 'AUROC' from the sentence.
- applied: true
- fingerprint: 52e84cce489e

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: 'AUROC' deleted; sentence now says the two sort the holdout set into the same buckets, so identical Gini and lift.

## [F-004] Loss ratio chart missing from the model-comparison pictures
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Pictures that show calibration and compare models'
- claim: The page lists the quantile plot and double lift chart as the pictures that compare models.
- evidence: Goldburd §7.2 lists four measures of model lift: simple quantile plots (§7.2.1), double lift charts (§7.2.2), loss ratio charts (§7.2.3, pp.79-80: sort by predicted loss ratio, equal-exposure buckets, plot actual loss ratio) and the Gini index (§7.2.4). The loss ratio chart is absent; there is no Concepts/Loss Ratio Chart page.
- source_rank: 2
- proposed_action: A writer adds a loss-ratio-chart bullet (and, if wanted, a page) from Goldburd §7.2.3. Adding prose is outside the checker's clean-up limits.
- applied: false
- fingerprint: f6ba8b9fa212

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: discrimination and classification bullets against Goldburd §7.2-7.3.1, Salis §§3-4 and ISLR §4.4.2; test MSE (eq 2.6) and test error rate (eq 2.9) against ISLR §2.2; both examples recomputed from scratch (confusion counts 2/2/1/5, AUROC 18/21 = 0.857 by pair count, matching Salis Table 12's formula; normalized Gini 0.714; B = 1.1A predictions 242/341/473/704, A/E ratios and 400/440 = 0.91); links resolved
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Verified medium: open minor F-004 (loss ratio chart omitted), and the page's calibration/discrimination/classification framing and 'holdout deviance' are its own organization rather than text in the pages read. Everything numeric agrees with recomputation and the readings.
