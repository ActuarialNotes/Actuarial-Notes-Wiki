---
target: Concepts/Multicollinearity.md
created: 2026-10-04
---

## [F-001] S_jj in the coefficient-variance formula is never defined
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: second formula block, Var(b_j) = sigma²/S_jj x VIF_j
- claim: Var(b_j) = sigma²/S_jj x VIF_j, with S_jj not defined anywhere on the page.
- evidence: PSU STAT 501 Lesson 12 §12.4 (sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e): Var(b_k) = sigma²/sum_i(x_ik - xbar_k)² x 1/(1 - R_k²), i.e. S_jj is the centred sum of squares of x_j. The formula is right; undefined, S_jj is easily read as the uncentred j-th diagonal element of X'X, which gives a different (wrong) variance.
- source_rank: 3
- proposed_action: Define S_jj = sum_i (x_ij - xbar_j)² beside the formula.
- applied: false
- fingerprint: 9136eeadd38f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (VIF = 1/(1 - 0.92) = 12.5, SE factor sqrt(12.5) = 3.54) - agree; definition, VIF formula and rule of thumb, variance formula, symptoms, prediction vs interpretation, dummy trap, remedies, detection checked; figure is illustrative; links and embed resolve; MAS-I and PCPA usage consistent
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 item 6 'Collinearity': contour valley, inflated SEs, correlation matrix, multicollinearity, VIF = 1/(1 - R²_Xj|X-j), 5-10 rule, drop or combine, printed pp.99-103 (PDF pp.109-113); §3.2.2 overall F vs individual tests, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.1 structural vs data-based; §12.3 predictions within scope unaffected, interpretation lost; §12.4 VIF, Var(b_k) = sigma²/sum(x - xbar)² x 1/(1-R_k²), significant F with non-significant t-tests; §12.5 collect more data; §12.6 centering, sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 linear dependence: X'X not invertible, software drops a column, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 full column rank required, PDF pp.6-7, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf
- note: One minor finding (F-001: S_jj undefined). Claims confirmed by ISLR 2nd ed. and PSU STAT 501 (variance formula rank 3), hence medium.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added a bullet defining S_jj = sum_i (x_ij - xbar_j)², the centred sum of squares of x_j (not the uncentred diagonal of X'X), so sigma²/S_jj is Var(b_j) when x_j is the only predictor and VIF_j is the factor by which the other predictors inflate it. Source: PSU STAT 501 Lesson 12 §12.4: Var(b_k)_min = sigma²/sum_i(x_ik - xbar_k)² for the model with x_k as the only predictor; Var(b_k) = that x 1/(1 - R_k²); VIF_k = ratio, sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: new bullet re-read against PSU Lesson 12 §12.4; both examples recomputed in python (VIF = 1/(1 - 0.92) = 12.5, SE factor sqrt(12.5) = 3.54) - agree; VIF formula and variance formula re-checked; links and embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 item 6 'Collinearity': inflated SEs, correlation matrix, multicollinearity, VIF = 1/(1 - R²_Xj|X-j), 5-10 rule, drop or combine, printed pp.99-103 (PDF pp.109-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3 predictions within scope unaffected, interpretation lost; §12.4 Var(b_k) = sigma²/sum_i(x_ik - xbar_k)² x 1/(1 - R_k²), Var(b_k)_min with x_k the only predictor, VIF_k = 1/(1-R_k²), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 linear dependence: X'X not invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 full column rank required for (X'X)^-1, PDF pp.6-7, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf
- note: F-001 resolved. Medium: the coefficient-variance formula rests on PSU (rank 3); VIF and symptoms confirmed by ISLR.

## [F-002] Sign-flip example trades coefficients of opposite sign for negatively correlated predictors
- entry_type: finding
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Sign Flip in a Rating Model', answer
- claim: With r = -0.94 the fit can trade a large coefficient on one against a large opposite coefficient on the other.
- evidence: For two predictors, (X'X)^-1 has off-diagonal -Cov[X1,X2]/det (Shalizi, CMU 36-401 Lecture 17, Fall 2015, §2.1 p.6, with Var[beta-hat] = sigma^2 (x'x)^-1, eq. (6) p.5), so the estimates' correlation has the opposite sign to the predictors'. With predictors correlated at -0.94 the estimates are positively correlated: the fit is held by moving the two coefficients the same way, not by opposite-signed coefficients. This also contradicted the page's new bullet on correlated estimates.
- source_rank: 3
- proposed_action: Restate sign-neutrally: the fit can raise one coefficient and offset it through the other.
- applied: true
- fingerprint: 63b785624b20

## [F-001/R2] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated in this run: 'the fit can raise one coefficient and offset it through the other with little change in the likelihood'.

## [C-003] Comment
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- note: Entry F-001/R2 above was recorded against the wrong finding id in this run: F-001 was already resolved (F-001/R). Its note describes the fix for F-002, which is resolved in the next entry.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this run: 'the fit can raise one coefficient and offset it through the other with little change in the likelihood'.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-read; the new bullet against ISLR Fig. 3.15 (narrow valley, sloping down for the positively correlated limit and rating, pairs held to the valley) and p.101-102 (SE grows, may fail to reject H0, limit masked); estimates' correlation opposite in sign to the predictors' for p = 2 from Shalizi Lecture 17 p.6 inverse with eq. (6); sum (x1 ~ x2) or difference (x1 ~ -x2) determined by substitution into the mean, consistent with Shalizi ADA §2.1.1; earlier bullets and the VIF example (1/(1-0.92) = 12.5, sqrt = 3.5) re-checked against ISLR and PSU; rule 10 vs masii-2018f-023 (no posterior values or answer)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §3.3.3 item 6 'Collinearity' incl. Figures 3.14-3.15 and Table 3.11, inflated SEs, failure to reject H0, masked importance, VIF, printed pp.99-103 (PDF pp.109-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Shalizi, C. R., CMU 36-401 Modern Regression, Lecture 17 'Multicollinearity' (Fall 2015), §2 eq. (6) p.5 Var[beta-hat] = sigma^2 (x'x)^-1 and §2.1 p.6 the inverse of n^-1 x'x for p = 2, whose beta1-beta2 entry is -Cov[X1,X2]/det, sha256:d8115efaaad92aacf470b4ba842b184c2906aba30816c4f6ae2a13b8c1327380 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/lecture-17.pdf; Shalizi, C. R., Advanced Data Analysis from an Elementary Point of View, ch. 2 'The Truth about Linear Regression' §2.1.1 Collinearity (CMU 36-402, 2015), sha256:1440d81067548f5e0c922470a6e0e8dc6c8ab1bace12b06eb70e279fbf97bc8a — https://www.stat.cmu.edu/~cshalizi/uADA/15/lectures/02.pdf; Penn State STAT 501 Regression Methods, Lesson 12 §12.3-12.4 (wider confidence intervals, predictions within scope unaffected, Var(b_k) and VIF, overall F significant with non-significant t-tests), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; Penn State STAT 501 Regression Methods, Lesson 5 §5.4 linear dependence: X'X not invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.2.1 full column rank required for (X'X)^-1, PDF pp.6-7, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf
- note: Re-verified after the MAS-II G8 edits. The writer's flagged clauses (upward valley for x1 ~ -x2; coefficient and predictor correlations of opposite sign) are sourced to the (X'X)^-1 entry in Shalizi Lecture 17 p.6. F-002 (sign-flip example's 'opposite coefficient' for negatively correlated predictors) restated sign-neutrally. An entry F-001/R2 was mis-keyed in this run and is annotated by a comment. Medium: the sign relation rests on open lecture notes and algebra, not the reading's text. MAS-I (ready) and PCPA link it; the page holds for each.
