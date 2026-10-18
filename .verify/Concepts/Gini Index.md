---
target: Concepts/Gini Index.md
created: 2026-10-18
---

## [F-001] AUROC-based Gini stated unnormalized, and filed as a third 'distinct use'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: major
- status: open
- locus: lead; section '2. Model predictive accuracy'; example 'Gini as a Model Performance Metric'
- claim: The Gini index has three distinct uses, the second being 'Gini = 2·AUROC − 1' for binary classifiers; example: AUROC 0.78 gives Gini 0.56.
- evidence: Goldburd §7.3.1 p.85 and footnote 17: 'the AUROC is equal to 0.5 × normalized Gini + 0.5, where normalized Gini is the ratio of the model's Gini index to the Gini index of the hypothetical "perfect" model'. The monograph's Gini (§7.2.4 p.81, and for a logistic model §7.3 p.82) is twice the area between the Lorenz curve and the line of equality, unnormalized; for a binary target with event rate p a perfect model's Gini is 1 − p, so Gini = (2·AUROC − 1)(1 − p), not 2·AUROC − 1. Recomputed on Predictive Accuracy's own ten-claim example (p = 0.3): trapezoid area under the Lorenz curve 0.25, Gini 0.50; perfect Gini 0.70; normalized 0.714 = 2(0.857) − 1. Salis (pp.4-7) computes the Gini for lift unnormalized by the trapezoid rule. Salis §2.1 p.2: the Gini index for node purity 'is separate and independent from the Gini index for lift', which 'can measure the segmentation power of any type of predictive model' — two measures, not three; Goldburd §7.3 p.82 computes the logistic model's Gini from the same Lorenz construction.
- source_rank: 2
- proposed_action: Restate the lead to Salis's two measures; fold the AUROC relation into the rating-model section as a property of the normalized Gini (Goldburd fn 17); label the example 'normalized Gini'.
- applied: true
- fingerprint: 0c5989db46fc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Lead restated to Salis §2.1's two separate measures; former section 2 removed and the AUROC relation now a bullet under the Lorenz-curve Gini, stated for the normalized Gini per Goldburd fn 17 and §7.3.1 p.85; example asks for the normalized Gini of a logistic model (2(0.78) − 1 = 0.56).

## [F-002] Unsourced claim that Gini is preferred over entropy for computational simplicity
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- severity: minor
- status: open
- locus: decision-tree bullets, last
- claim: 'Gini is preferred over Entropy in practice as it is computationally simpler.'
- evidence: ISLR §8.1.2 p.336 says the Gini index and entropy 'are quite similar numerically' and that either is typically used to evaluate the quality of a split because both are more sensitive to node purity than the classification error rate. It states no preference between them. Salis §2 adds nothing to the contrary.
- source_rank: 2
- proposed_action: Restate to ISLR p.336.
- applied: true
- fingerprint: de7494ad1c02

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Bullet restated to ISLR p.336: numerically similar, either used to evaluate splits, both more sensitive to node purity than the classification error rate.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:05Z/f7a6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: impurity formula against ISLR eq 8.6 and Salis §2.3; Lorenz-curve Gini against Goldburd §7.2.4 and Salis §3.2 (trapezoid formula G = 1 − Σ(x_j − x_{j−1})(y_{j−1}+y_j), equivalent to the page's 1 − 2∫L); AUROC relation against Goldburd fn 17; all three examples recomputed (0.42; 0.56; trapezoid 0.375 → 0.25); Salis Tables 1 and 5 recomputed (0.56; 0.73 → 0.27); links resolved
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: Both senses the exam page links (C5 node impurity, C14 predictive accuracy) are now stated as their readings state them. Source-internal note: Salis Table 3 gives policy 10's predicted loss cost as 200 and Table 4 aggregates it as 190; the Gini (0.27) is unaffected. Not a vault error.
