---
target: Concepts/Correlation.md
created: 2026-10-04
---

## [F-001] Joint normality given as the only case where zero correlation implies independence
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: second bullet
- claim: Zero correlation does not imply independence unless X and Y are jointly normal.
- evidence: The jointly-normal case is right: Siegrist, Random, 'The Multivariate Normal Distribution' — for a bivariate normal pair, 'X and Y are independent if and only if rho = 0' (sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html). But 'unless' makes it the only exception, and it is not: Siegrist Ch.4 §5 'Covariance and Correlation' shows events A and B are independent if and only if their indicator variables are uncorrelated, i.e. for two indicator (two-valued) variables zero correlation does imply independence (sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html). The general statement the source makes is that independence implies zero correlation and 'the converse fails' (same page, X uniform on [-1,1], Y = X^2).
- source_rank: 3
- proposed_action: Say zero correlation does not in general imply independence; it does for jointly normal variables (and, e.g., for two indicator variables).
- applied: false
- fingerprint: bfd181cbedaf

## [F-002] Only the population coefficient is given; MAS-I's EDA use is the sample r and R^2 = r^2
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: definition and formula block (whole page)
- claim: The page defines only the population correlation rho(X, Y) = Cov(X, Y) / (sigma_X sigma_Y) of two random variables; it gives no sample correlation r and no link to R^2, although the MAS-I page lists it under Exploratory Data Analysis beside [[Scatter Plot]], whose page reads 'the Correlation coefficient r' off data.
- evidence: Exam MAS-I (CAS).md lists '[[Scatter Plot]] and [[Correlation]]' under its Exploratory Data Analysis heading (outline task C9, EDA plots). The MAS-I reading uses the sample quantity: ISLR 2nd ed. §3.1.3 eq. (3.18), Cor(X,Y) = sum (x_i - xbar)(y_i - ybar) / [sqrt(sum (x_i - xbar)^2) sqrt(sum (y_i - ybar)^2)], footnote 5 'the right-hand side of (3.18) is the sample correlation', and 'in the simple linear regression setting, R^2 = r^2… However… correlation quantifies the association between a single pair of variables… R^2 fills this role', printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Siegrist Ch.6 §7 'Sample Correlation and Regression' likewise defines the sample correlation and calls r^2 the coefficient of determination (sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072). Nothing the page says is wrong; the omission is of the form the linking exam uses.
- source_rank: 2
- proposed_action: Add the sample correlation r (ISLR eq. 3.18) and the simple-regression identity R^2 = r^2, noting that r does not extend to several predictors (ISLR §3.1.3).
- applied: false
- fingerprint: f83d7bf77b2d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: formula rho = Cov/(sd sd) = Siegrist §4.5 definition (and ISLR 3.18 in sample form); range [-1, 1] and rho = +/-1 iff Y is a linear function of X w.p.1 with positive/negative slope = Siegrist §4.5 'Additional properties'; rho = 0 'uncorrelated', no linear association = Siegrist §4.5 best-linear-predictor result; dimensionless / invariant to positive rescaling = Siegrist §4.5; zero correlation vs independence: jointly normal case = Siegrist MultiNormal, 'unless' overstated (F-001); example recomputed first: sigma_X = 5, sigma_Y = 6, rho = -18/30 = -0.6 = stated; links (Random Variable, Covariance, Independent Random Variables) and figure embed resolve; figure builder draws +0.9 / -0.9 / 0 ellipses as captioned; consistency with Concepts/Correlation Coefficient.md (rank 4, Exam P) — same formula and range.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (definition; properties incl. -1<=cor<=1 and cor=±1 iff linear w.p.1; independent => uncorrelated, converse fails; indicator variables), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (jointly normal: independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r; r^2 = coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) and footnote 5, R^2 = r^2, printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Linked by Exam MAS-I (EDA, beside Scatter Plot) and Exam 9 ('evaluate correlations of risks', Brehm ERM). Exam P links Correlation Coefficient, not this page. The page's Pearson-only sense is narrower than Exam 9's ERM usage (dependence of risks); not flagged as an error, and the Exam 9 reading (Brehm) was not available to check. Medium: Siegrist is rank 3; ISLR (rank 2) confirms the sample form only.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Second bullet rewritten: zero correlation 'does not in general imply independence' (example X uniform on [-1,1], Y = X^2, uncorrelated yet a function of X — Siegrist Ch.4 §5 Uniform Distributions example: E(X)=0, E(XY)=E(X^3)=0); 'It does for jointly normal X and Y' (Siegrist MultiNormal: bivariate normal X, Y independent iff rho = 0) 'and for two indicator variables — events A and B are independent exactly when their indicators are uncorrelated' (Siegrist Ch.4 §5, indicator-variable result). The 'unless … jointly normal' exclusivity is gone.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Added, after the bullets: the sample correlation r = sum (x_i - xbar)(y_i - ybar) / [sqrt(sum (x_i - xbar)^2) sqrt(sum (y_i - ybar)^2)] as ISLR eq. (3.18) prints it (footnote 5: it is the sample correlation; Siegrist Ch.6 §7 r = s(x,y)/(s(x)s(y)), the same ratio), tied to the r read off a [[Scatter Plot]]; and a bullet 'In simple linear regression the [[R-Squared]] of the fitted line equals r^2. With several predictors the idea does not carry over — correlation describes one pair of variables at a time — and R^2 fills that role' (ISLR printed pp.70-71, PDF pp.80-81; Siegrist §6.7 r^2 = SSR/SST). Python check on simulated data (n=50): r from the formula = np.corrcoef = -0.5973, r^2 = R^2 of the least-squares line = 0.3567.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Every edit re-read against its source: independence bullet = Siegrist Ch.4 §5 (Y = X^2 example, indicator result) + MultiNormal (rho = 0 iff independent for bivariate normal); sample r formula = ISLR eq. 3.18 (PDF p.80), R^2 = r^2 in simple regression and its failure to extend to several predictors = ISLR PDF p.81; formula and R^2 identity re-run in python. Unchanged claims (rho = Cov/(sd sd), range [-1,1], unit-free) = Siegrist §4.5 as in C-001; example recomputed: sigma 5 and 6, rho = -18/30 = -0.6. Links (Random Variable, Covariance, Independent Random Variables, Scatter Plot, R-Squared) and figure embed resolve. F-001 and F-002 closed.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) sample correlation, footnote 5, and 'in the simple linear regression setting, R^2 = r^2 … correlation quantifies the association between a single pair of variables … R^2 fills this role', printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (independent => uncorrelated, 'the converse fails'; X uniform on [-1,1], Y = X^2 uncorrelated; events independent iff their indicator variables are uncorrelated), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (bivariate normal: X and Y independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r = s(x,y)/(s(x)s(y)); r^2 = SSR/SST, the coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html
- note: High: the sample form and R^2 = r^2 (MAS-I's use) are confirmed by ISLR (rank 2); the population definition and independence facts by Siegrist (rank 3), which are standard results the Exam P/MAS-I readings also state. Exam 9's ERM sense (dependence of risks, Brehm) still not checked against Brehm.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Same checks as the preceding pass of this run (edits re-read against ISLR PDF pp.80-81 and Siegrist; sample r and R^2 = r^2 re-run in python; example -0.6 recomputed; links resolve).
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) sample correlation, footnote 5, and 'in the simple linear regression setting, R^2 = r^2 … correlation quantifies the association between a single pair of variables … R^2 fills this role', printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (independent => uncorrelated, 'the converse fails'; X uniform on [-1,1], Y = X^2 uncorrelated; events independent iff their indicator variables are uncorrelated), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (bivariate normal: X and Y independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r = s(x,y)/(s(x)s(y)); r^2 = SSR/SST, the coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html
- note: Supersedes the preceding pass's confidence: high was one notch too far — the population definition and the independence facts (Y = X^2, jointly normal, indicators) rest on Siegrist (rank 3) only, not a rank-1/2 reading, so medium under the resolve policy. No content change between the two passes.
