---
target: Concepts/Cross-Validation.md
created: 2026-10-04
---

## [F-001] k = 5 or 10 framed as bias vs computation; ISLR's main reason is bias vs variance
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: body, bullet 'k-fold' (line 20)
- claim: k = 5 or 10 is the standard compromise between bias and computation.
- evidence: ISLR 2nd ed. §5.1.3-5.1.4 (printed pp.203-206, PDF pp.212-215, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): computation is 'the most obvious advantage', but 'a less obvious but potentially more important advantage of k-fold CV is that it often gives more accurate estimates of the test error rate than does LOOCV. This has to do with a bias-variance trade-off ... one performs k-fold cross-validation using k = 5 or k = 10, as these values have been shown empirically to yield test error rate estimates that suffer neither from excessively high bias nor from very high variance.' The page's next bullet does say LOOCV has high variance, so the content is present; only the stated rationale for 5 or 10 drops the variance side.
- source_rank: 2
- proposed_action: Change 'between bias and computation' to 'between bias and variance (and computation)'. Not applied.
- applied: false
- fingerprint: 61c143ac5187

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: CV_(k) vs ISLR (5.3); LOOCV leverage shortcut vs ISLR (5.2) (least-squares only, 'does not hold in general'); LOOCV low bias / high variance vs ISLR §5.1.4; k = 5 or 10 rationale (F-001 nit); non-nested comparisons vs ISLR §6.1.3; selection inside the folds vs ISLR p.271 and Monograph 5 §4.3.4; time-ordered/grouped folds vs Monograph 5 §4.3.1 and §4.3.4 (temporal split; shared events leak across random splits); both examples re-read (CV minimum 395 at model 3); links resolve; figure checked by SVG title/labels only
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §5.1 Cross-Validation (printed pp.198-206, PDF pp.207-215); §6.1.3 'Validation and Cross-Validation' (printed p.235, PDF p.243); §6.5.1 lab (printed p.271, PDF p.279), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3.1 out-of-time validation PDF p.50; §4.3.4 cross validation PDF pp.51-52, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified, medium: the time-ordered/grouped-data bullet rests on CAS Monograph 5 (rank 3); one nit open (F-001).
