---
target: Concepts/Regularization.md
created: 2026-10-05
---

## [F-001] Budget (constraint) form of ridge and lasso absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: formula block
- claim: Ridge: min RSS + lambda sum beta_j^2; Lasso: min RSS + lambda sum |beta_j| - penalized forms only.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §6.2.2 'Another Formulation for Ridge Regression and the Lasso' (PDF p.251), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: the lasso and ridge estimates minimize RSS subject to sum |beta_j| <= s (eq. 6.8) and sum beta_j^2 <= s (eq. 6.9); for every lambda there is a matching s, and the diamond/circle constraint geometry is why the lasso gives exact zeros. Three of the seven MAS-I questions linking this page are set in the budget form (masi-2018s-034, masi-2018s-036, masi-2019f-037: 'sum beta_j^2 <= s', '|b1| + |b2| <= s = 5'). The page has no budget form and no direction of the lambda<->s correspondence (large s = small lambda).
- source_rank: 2
- proposed_action: Add eqs. 6.8-6.9 and the lambda<->s direction. Authoring - not applied.
- applied: false
- fingerprint: 3d7832bcd4a9

## [F-002] Ridge called 'the fix for collinearity'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 2 (Ridge)
- claim: Ridge (l2) shrinks all coefficients smoothly and keeps every predictor - good when many predictors each contribute a little, and the fix for collinearity.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §3.3.3 'Collinearity' (PDF pp.112-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'When faced with the problem of collinearity, there are two simple solutions' - drop one of the problematic variables, or combine the collinear variables into a single predictor; §6.2.1 (PDF p.249) motivates ridge by high-variance least squares (p close to n), not collinearity. Rank 3: Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026) p.2, sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf: 'the ridge penalty shrinks the coefficients of correlated predictors towards each other while the lasso tends to pick one of them' - support for ridge stabilising correlated predictors, not for 'the' fix. The first half matches ISLR §6.2.2 (PDF p.254: ridge 'will perform better when the response is a function of many predictors, all with coefficients of roughly equal size').
- source_rank: 2
- proposed_action: Say ridge stabilises (shares weight across) correlated predictors, and that ISLR's remedies for collinearity are dropping or combining variables. Not applied.
- applied: false
- fingerprint: fbeb26e15998

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (task 13 - not in the 2026 MAS-II outline; James Ch 6 is MAS-I) and 7 MAS-I questions; ridge (6.5) and lasso (6.7) diffed against ISLR; lambda = 0 / lambda -> inf limits, CV choice, intercept unpenalized (PDF p.245), standardize (6.6, PDF p.247), 'small increase in bias for a large decrease in variance' (PDF p.249), lasso exact zeros/selection, sparse vs many-small (PDF p.254), one-SE rule (PDF p.244); elastic net against glmnet vignette (beyond ISLR); links (3) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 (PDF pp.112-113), §6.1.3 one-standard-error rule (PDF p.244), §6.2.1-6.2.3 eqs. 6.5-6.9 incl. scaling eq. 6.6, unpenalized intercept, bias-variance (PDF pp.245-258), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026), Introduction (PDF pp.1-2), sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list incl. Ch 6 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Formulas and claims match ISLR §6.2 (MAS-I sense). Elastic net is not in ISLR (not MAS-I reading) but is correctly described per glmnet. Two minor findings open (budget form absent; 'the fix for collinearity').

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added the budget form to the formula block (min RSS subject to sum beta_j^2 <= s (ridge) or sum |beta_j| <= s (lasso)) and a bullet on the lambda<->s correspondence: for every lambda there is an s giving the same estimates; large s = small lambda (an s containing the least squares fit is lambda = 0), small s = large lambda; with p = 2 the lasso region is a diamond and the ridge region a circle, and the RSS contours often first touch the diamond at a corner on an axis, which is why the lasso returns exact zeros. Source: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §6.2.2 'Another Formulation for Ridge Regression and the Lasso' eqs. 6.8-6.9 (PDF p.251), 'such a large value of s corresponds to lambda = 0' (PDF p.252), 'the lasso constraint has corners at each of the axes, and so the ellipse will often intersect the constraint region at an axis' (PDF p.253), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Ridge bullet no longer calls ridge 'the fix for collinearity'. Now: 'With correlated predictors it shrinks their coefficients toward each other rather than choosing one; the usual remedies for collinearity itself are to drop one of the collinear variables or combine them into a single predictor.' Sources: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §3.3.3 'Collinearity' (PDF pp.112-113: 'there are two simple solutions. The first is to drop one of the problematic variables ... The second solution is to combine the collinear variables together into a single predictor'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026) p.2, sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf ('the ridge penalty shrinks the coefficients of correlated predictors towards each other while the lasso tends to pick one of them and discard the others').

## [F-003] Collinearity remedies called 'the usual' ones
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet 'Ridge', last clause (wording introduced by F-002/R)
- claim: the usual remedies for collinearity itself are to drop one of the collinear variables or combine them into a single predictor
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §3.3.3 'Collinearity' (PDF pp.112-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: 'When faced with the problem of collinearity, there are two simple solutions. The first is to drop one of the problematic variables ... The second solution is to combine the collinear variables together into a single predictor.' The source calls them two simple solutions; 'usual' (a claim about practice) is not in it. Found re-reading the run-3707 edit.
- source_rank: 2
- proposed_action: Say 'the two simple remedies'.
- applied: true
- fingerprint: 4383e464d60f

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Ridge bullet now reads 'the two simple remedies for collinearity itself are to drop one of the collinear variables or combine them into a single predictor', ISLR's own framing: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §3.3.3 (PDF pp.112-113: 'there are two simple solutions'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: re-pass after run-3707 resolutions of F-001/F-002: whole log read; budget-form block and lambda<->s bullet re-read against eqs. 6.8-6.9 and PDF pp.251-253; ridge/collinearity wording re-read against §3.3.3 and glmnet p.2 - 'usual remedies' tightened to ISLR's 'two simple remedies' (F-003 nit, applied and resolved); unchanged claims re-checked (6.5/6.7 penalties, lambda=0 / lambda->inf, CV choice, intercept unpenalized, standardization 6.6, bias-variance, lasso sparsity, one-SE rule); example's reasoning re-read (sparse belief -> lasso); 3 wiki links and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 collinearity remedies (PDF pp.112-113), §6.1.3 one-standard-error rule (PDF p.244), §6.2.1 eq. 6.5, unpenalized intercept, lambda limits, scaling eq. 6.6, bias-variance (PDF pp.245-249), §6.2.2 lasso variable selection (PDF p.250), eqs. 6.8-6.9 budget form, lambda<->s, s large = lambda 0, diamond/circle and corners on the axes (PDF pp.251-253), sparse vs many-predictor settings (PDF p.254), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026), Introduction (PDF pp.1-2: elastic net alpha; ridge shrinks correlated predictors toward each other, lasso picks one), sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list incl. Ch 6 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Confidence medium, not high: the elastic-net bullet and 'ridge shrinks correlated coefficients toward each other' rest on the glmnet vignette (rank 3); elastic net is not in ISLR. Everything else is confirmed by ISLR (rank 2).
