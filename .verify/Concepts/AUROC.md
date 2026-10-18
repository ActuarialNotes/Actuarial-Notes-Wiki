---
target: Concepts/AUROC.md
created: 2026-10-18
---

## [F-001] Gini = 2·AUROC − 1 stated without normalization
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: bullet '[[Gini Index]] (as a model metric)'; example 'Interpreting AUROC for a Fraud Model'
- claim: The Gini index (as a model metric) = 2·AUROC − 1.
- evidence: Goldburd §7.3.1 p.85 and footnote 17: 'the AUROC is equal to 0.5 × normalized Gini + 0.5, where normalized Gini is the ratio of the model's Gini index to the Gini index of the hypothetical "perfect" model'. The monograph's Gini (§7.2.4 p.81, and for a logistic model §7.3 p.82) is twice the area between the Lorenz curve and the line of equality, unnormalized; for a binary target with event rate p a perfect model's Gini is 1 − p, so Gini = (2·AUROC − 1)(1 − p), not 2·AUROC − 1. Recomputed on Predictive Accuracy's own ten-claim example (p = 0.3): trapezoid area under the Lorenz curve 0.25, Gini 0.50; perfect Gini 0.70; normalized 0.714 = 2(0.857) − 1. Salis (pp.4-7) computes the Gini for lift unnormalized by the trapezoid rule.
- source_rank: 2
- proposed_action: Restate to the normalized Gini per Goldburd fn 17; ask the example for the normalized Gini.
- applied: true
- fingerprint: 1c576dd427bf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Bullet restated to AUROC = 0.5 × normalized Gini + 0.5 and, with §7.3.1 p.85, that the two are not separate validation metrics; example asks for normalized Gini (0.70, 0.44 recomputed).

## [F-002] AUROC interpretation bands are in no reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: interpretation table
- claim: AUROC 0.5-0.7 poor, 0.7-0.8 acceptable, 0.8-0.9 excellent, >0.9 outstanding.
- evidence: Goldburd §7.3.1 pp.84-85 gives only 0.500 for a model with no predictive power (ROC on the line of equality) and 1.000 for the perfect model; ISLR p.151 calls an AUC of 0.95 'very good' and 0.5 chance. No reading gives the bands.
- source_rank: 2
- proposed_action: Restate the table to Goldburd's two anchor values.
- applied: true
- fingerprint: df7ef312b406

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Table restated to the two values Goldburd pp.84-85 gives (0.5 no predictive power; 1.0 perfect).

## [F-003] Unsourced claim that AUROC is invariant to class imbalance
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets
- claim: 'AUROC is invariant to class imbalance, making it suitable for rare-event modeling.'
- evidence: Not in Goldburd §7.3, ISLR §4.4.2 or Salis §4.2.
- source_rank: 2
- proposed_action: Delete.
- applied: true
- fingerprint: 663e5f9df13c

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Bullet deleted.

## [F-004] AUROC contrasted with the marketing lift curve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet '[[Lift]] curve and AUROC'
- claim: 'The Lift curve and AUROC both measure ranking quality; AUROC is threshold-independent while lift focuses on specific fractions of the population.'
- evidence: In the readings lift is the vertical distance between first and last quantiles (Goldburd §7.2.1, Salis §3.1), not a curve over fractions targeted. ISLR p.151: the AUC summarizes performance 'over all possible thresholds' and ROC curves are useful for comparing classifiers; Goldburd p.84: choosing the threshold is typically a business decision.
- source_rank: 2
- proposed_action: Restate to ISLR p.151 and Goldburd p.84.
- applied: true
- fingerprint: 1c579f5ac25c

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: Bullet restated to ISLR p.151 (all thresholds, comparing classifiers) and Goldburd p.84 (threshold choice a business decision weighing true positives against false-positive cost).

## [F-005] Pair-probability reading of AUROC omits ties
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: nit
- status: open
- locus: bullet 'AUROC equals the probability…'
- claim: AUROC equals the probability a random positive is ranked higher than a random negative.
- evidence: Salis §4.2 Table 12 p.12: AUROC = Σ n_i(c_{i−1}+c_i)/(2NP), i.e. per negative, the positives scored above it plus half those tied with it, over all N·P pairs. Recomputed on Salis's Table 8 by pair count: 5 + 6.5 + 7.5 + 9 + 9 = 37, 37/50 = 0.74, Salis's answer. With ties (which Salis's data has) the probability reading needs 'a tie counting half'.
- source_rank: 2
- proposed_action: Add 'a tie counting half'.
- applied: true
- fingerprint: 14e10fd05962

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: 'a tie counting half' added.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: ROC axes and TPR/FPR against ISLR Table 4.7 and Goldburd p.84; AUROC as area against ISLR p.151, Goldburd pp.84-85 and Salis §4.2 (Table 11 trapezoids and Table 12 recomputed, 0.74); pair-probability reading checked as algebraically identical to Salis's Table 12 formula; example recomputed; links resolved
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: Verified after F-001 to F-005.
