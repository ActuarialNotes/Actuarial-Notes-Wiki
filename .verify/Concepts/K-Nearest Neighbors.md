---
target: Concepts/K-Nearest Neighbors.md
created: 2026-10-18
---

## [F-001] K=1 / K=50 example contradicts the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Effect of K on Decision Boundary', answer
- claim: The K=1 boundary 'passes through every training point'; the K=50 boundary 'generalizes better to new data'.
- evidence: ISLR §2.2.3, printed p.41: with K=1 the boundary is overly flexible and training error is 0; on the book's data K=1 and K=100 test errors are 0.1695 and 0.1925 — the smoother fit generalized worse, and the optimum was near K=10. A classification boundary separates points; it does not pass through them.
- source_rank: 2
- proposed_action: Delete both clauses, keeping 'zero training error' and 'may misclassify some training observations'.
- applied: true
- fingerprint: c9db8ff52466

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Both clauses deleted in this run.

## [F-002] 'Lazy learner' is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4
- claim: KNN is a lazy learner with no explicit training phase.
- evidence: Full-text search of ISLR 2nd ed.: 'lazy' 0 hits.
- source_rank: 2
- proposed_action: Cite a source for the term or delete the bullet.
- applied: false
- fingerprint: 4681ac584b55

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/5d97
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: read the routed ISLR pages before the page; formula-by-formula comparison; full-text search of every named method; worked examples recomputed independently; wiki-links and embeds resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §2.2.3 'K-Nearest Neighbors', printed pp.39-42 (PDF pp.50-53); §3.5, printed pp.105-108 (PDF pp.115-118); §4.7.6, printed p.183 (PDF p.193), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Classification estimate (2.12) and argmax rule (p.39), regression average (p.105), non-parametric (p.105), K trade-off and choice via Ch.5 methods (pp.41-42, 106), standardization because scale matters (p.183), curse of dimensionality (p.108) all match. Example 1: 2/3 fraud -> Fraud. F-001 fixed; F-002 open. Also linked from Exam SRM.

## [F-003] Bayes error rate on given test points stated as the rate itself
- entry_type: finding
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Bayes error rate'
- claim: For a given set of test points the Bayes error rate is the average of 1 - max_j Pr(Y=j|X=x_i) over those x_i.
- evidence: ISLR §2.2.3 p.38-39 gives the per-point error 1 - max_j Pr(Y=j|X=x0) and the overall rate (2.11) as an expectation over all X; it does not define a rate on given points. The average over given points is the Bayes classifier's expected error rate at those points (linearity of expectation over the per-point error probabilities), so restated as that.
- source_rank: 2
- proposed_action: Restate as the expected error rate at the given points, the average of the per-point error probabilities.
- applied: true
- fingerprint: 8c29b23b860d

## [F-004] Lazy-learner bullet restated to a source
- entry_type: finding
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'lazy learner' (F-002)
- claim: KNN is a lazy learner — it stores all training data and does computation at prediction time.
- evidence: MIT OCW 15.062 Data Mining (Spring 2003), k-Nearest Neighbor notes, §3 p.4: 'while there is no time required to estimate parameters from the training data (as would be the case for parametric models such as regression) the time to find the nearest neighbors in a large training set can be prohibitive.' The term 'lazy learner' is in neither this nor ISLR.
- source_rank: 3
- proposed_action: Restate without the term: estimates no parameters, works at prediction time, slow in a large training set.
- applied: true
- fingerprint: 43bfef7a48db

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated in this run to the expected error rate at the given points (average of the per-point error probabilities).

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Bullet restated in this run to MIT OCW 15.062 notes p.4.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: The 'lazy learner' term removed; the bullet now says what MIT OCW 15.062 notes p.4 state (F-004).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-read against ISLR §2.2.3/§3.5/§4.7.6 and the MIT notes; Bayes classifier and per-point error 1-max_j (p.38-39), unattainable gold standard (p.39), (2.11) Bayes error rate as expectation over X; two-class min{p,1-p} = 1-max(p,1-p) checked; K=n case against MIT p.2; rule 10 vs masii-2018f-037 and masii-2019s-038 (no question numbers or answers on the page); example 1 recomputed (2/3, Fraud)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §2.2.3 'The Classification Setting' and 'K-Nearest Neighbors', printed pp.37-42 (PDF pp.48-53) incl. eqs. (2.11)-(2.12); §3.5, printed pp.105-108 (PDF pp.115-118); §4.7.6, printed p.183 (PDF p.193), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; MIT OpenCourseWare 15.062 Data Mining (Spring 2003), 'k-Nearest Neighbor Algorithms for Classification and Prediction' notes, §1 p.2 (k = n predicts the training majority for all observations, oversmoothing) and §3 p.4 (no time to estimate parameters; finding neighbors in a large training set slow), sha256:ab47cf9500c44d5dc75dfb2c76f58cd5431810f39c3da5b0d085284cde7cb746 — https://ocw.mit.edu/courses/15-062-data-mining-spring-2003/c58922a0bfc2261ec849ebdbfdae9bf9_knn3.pdf
- note: Re-verified after MAS-II G8 edits (K = n, Bayes classifier, Bayes error rate). F-003 (Bayes rate on given points restated as the expected error rate there) and F-004 (lazy-learner bullet restated to MIT p.4, closing F-002) fixed. Medium: two bullets rest on open lecture notes rather than the reading. Also linked from Exam SRM and ACIA-CAPSTONE; the page holds for each.
