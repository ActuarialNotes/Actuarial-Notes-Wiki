---
target: Concepts/Test Error.md
created: 2026-10-05
---

## [F-001] 'A GLM uses holdout deviance' is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 1 (last clause)
- claim: The MSE suits a numeric response and the error rate a classifier; a GLM uses holdout deviance.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) measures test error by test MSE (eq. 2.6, PDF p.41) and test error rate (eq. 2.9, PDF p.48) only; its GLM lab output (PDF p.183) shows null/residual deviance as in-sample fit statistics. A search of Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.) (sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) for deviance near holdout / test set / out-of-sample / validation found no such passage. The MSE and error-rate halves are correct; 'a GLM uses holdout deviance' is not supported by any source read.
- source_rank: 2
- proposed_action: Cite a source, or soften to 'deviance can also be computed on holdout data'. Not applied.
- applied: false
- fingerprint: 3f96174eeb0c

## [F-002] Bootstrap 'looks optimistic' claim is unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Not the bootstrap's job', last sentence
- claim: Each bootstrap resample overlaps the original data (about 63% of distinct observations), so a model scored on it looks optimistic.
- evidence: The 63% figure is consistent with James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §8.2.1 (PDF p.350: each bagged tree uses 'around two-thirds of the observations') and Ex. 5.4.2 (PDF pp.228-229), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The optimism consequence is not stated in ISLR (searched 'overlap', 'optimistic'); the rank-3 reference that treats it (Hastie, Tibshirani & Friedman, ESL §7.11) could not be fetched - hastie.su.domains reset the connection on two attempts. The sentence is also unclear about which data a model is fitted to and which it is scored on. Unsourced, not shown wrong.
- source_rank: 2
- proposed_action: Cite ESL §7.11 (or drop), and say 'a model fitted to a resample and scored on the original data looks optimistic'. Not applied.
- applied: false
- fingerprint: 4583200f7d97

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (tasks 1-2 - CV is not in the 2026 MAS-II outline; James Ch 5 is MAS-I) - also 5 MAS-I questions; test MSE (2.6), error rate (2.9), decomposition (2.7) diffed; validation-set drawbacks, LOOCV (5.1) and least-squares shortcut (5.2) with leverage, k-fold (5.3), k=5/10 and the LOOCV-correlation argument against §5.1; both examples recomputed (CV_A 420, CV_B 450, gaps 40/140; fit 1.5+2x, training MSE 1.25, leverages 0.7/0.3, CV(4) = 3.685, x2.95, 11.1-fold); links (11) resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.2.1 eq. 2.6 (PDF p.41), §2.2.2 eq. 2.7 and 'never lie below Var(e)' (PDF p.45), §2.2.3 eq. 2.9 (PDF p.48), §5.1.1-5.1.4 eqs. 5.1-5.3 (PDF pp.207-215), §5.2 eq. 5.8 (PDF p.220), §6.1.3 AIC/BIC (PDF pp.240-244), §8.2.1 OOB (PDF p.350), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: All formulas and both worked examples check against ISLR Ch 2 and 5. Two minor findings open (holdout deviance; bootstrap optimism), both unsourced rather than wrong.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Deleted the clause 'a GLM uses holdout [[Deviance|deviance]]'; bullet 1 now ends at the MSE / error-rate pairing, which James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) states (eq. 2.6 test MSE, PDF p.41; eq. 2.9 test error rate, PDF p.48), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. No source read this session supports the deleted clause: a fresh search of Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf for deviance within reach of test/holdout/out-of-sample/unseen/new data found only in-sample uses (§6.1.3 same-dataset caveat PDF p.74, F-test PDF p.75, penalized measures PDF p.76, training-set deviance PDF p.112), and Larsen's study note has no holdout-deviance passage. Deleted rather than kept.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Deleted the sentence 'Each bootstrap resample overlaps the original data (about 63% of distinct observations), so a model scored on it looks optimistic.' The bullet now ends 'Cross-validation measures how well a model predicts', which James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) Ch 5 intro supports (PDF p.206: CV for model assessment/selection, the bootstrap 'most commonly to provide a measure of accuracy of a parameter estimate'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. ISLR does not state the optimism consequence, and the rank-3 source that does (Hastie, Tibshirani & Friedman, ESL §7.11) could not be fetched again this session (hastie.su.domains: connection reset), so the unsourced claim is removed.
