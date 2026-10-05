---
target: Concepts/Scatter Plot.md
created: 2026-10-04
---

## [F-001] Scatter plot matrix offered as the screen for multicollinearity, which pairwise views can miss
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: last bullet before the figure
- claim: A scatter plot matrix (all pairs of predictors) is the fastest screen for [[Multicollinearity]].
- evidence: ISLR 2nd ed. §3.3.3 'Collinearity', printed p.102 (PDF p.112): 'A simple way to detect collinearity is to look at the correlation matrix of the predictors… Unfortunately, not all collinearity problems can be detected by inspection of the correlation matrix: it is possible for collinearity to exist between three or more variables even if no pair of variables has a particularly high correlation. We call this situation multicollinearity. Instead of inspecting the correlation matrix, a better way to assess multicollinearity is to compute the variance inflation factor (VIF)' (sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf). A scatter plot matrix shows exactly the pairwise relationships (NIST §1.3.3.26.11: 'Check pairwise relationships between variables'), so in ISLR's terms it screens for pairwise collinearity and by construction cannot show multicollinearity, the case ISLR defines as invisible pairwise.
- source_rank: 2
- proposed_action: Say the matrix screens pairwise collinearity, and that multicollinearity among three or more predictors needs the VIF (ISLR §3.3.3).
- applied: false
- fingerprint: acd9513176b7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: definition (Y vs X, one point per observation) = NIST §1.3.3.26; what to read (related? linear? non-linear? variation changing with X? outliers?) = NIST's questions and its quadratic / heteroscedastic / outlier examples; correlation measures linear association only = ISLR §3.1.3 and Siegrist §4.5 (uncorrelated yet functionally related: X uniform on [-1,1], Y = X^2); widening fan = non-constant variance = ISLR §3.3.3 (funnel shape); variance growing with the mean fitted by the variance power of the exponential family, Gamma p = 2 (SD proportional to mean) = Larsen p.2; high leverage = unusual x, large effect on the fit = ISLR §3.3.3; scatter plot matrix = NIST §1.3.3.26.11 and ISLR pairs() — multicollinearity claim contradicted by ISLR (F-001); examples reasoned first: U-shape with r ~ 0 (keep age, band or add age^2) and wedge (constant variance ruled out, Gamma log-link GLM) agree with the sources; links and figure embed resolve; figure builder draws a U with a near-flat least-squares line, as described.
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', sha256:3232379f988c0b0a21dc0591503b480263e3ff7eb0190c9c2a622ddb09a4b9f9 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.11 'Scatter Plot Matrix', sha256:8cc21d8e7eb4a8c19340d0358089efb945b82986dd29910a3c2e981aacd3c241 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatplma.htm; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. 3.18 and R^2 = r^2, printed pp.70-71 (PDF pp.80-81); §3.3.3 non-constant variance (funnel), high leverage points, collinearity, printed pp.96-102 (PDF pp.106-112); §2.3.5 pairs() scatterplot matrix, printed p.51 (PDF p.62), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (definition; properties incl. -1<=cor<=1 and cor=±1 iff linear w.p.1; independent => uncorrelated, converse fails; indicator variables), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium: rank-2 (ISLR, Larsen) and rank-3 (NIST, Siegrist) agreement on every substantive claim except the multicollinearity bullet (F-001, minor). Overplotting remedies (log scale, transparency, binning) are practice advice not found in a source read.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Last bullet rewritten: the scatter plot matrix now 'screens for pairwise collinearity, as the correlation matrix does — but it can miss Multicollinearity, collinearity among three or more predictors when no pair is highly correlated; ISLR assesses that with the variance inflation factor, VIF(beta_j) = 1/(1 - R^2_{Xj|X-j}), from regressing each predictor on all the others'. Source: ISLR 2nd ed. §3.3.3 'Collinearity', printed p.102 (PDF p.112) — correlation matrix for pairwise collinearity, multicollinearity defined as the pairwise-invisible case, VIF formula quoted; NIST §1.3.3.26.11 (scatterplot matrix = all pairwise plots). Python check: X1..X5 iid N(0,1), X6 = sum + N(0, 0.01) gives max |pairwise r| = 0.447 yet VIF(X6) ~ 500.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Rewritten bullet re-read against ISLR §3.3.3 PDF p.112 (wording, VIF formula) and NIST §1.3.3.26.11 (matrix = pairwise plots); python simulation shows low pairwise r with VIF in the hundreds. Rest of page unchanged since C-001 (definition and what-to-read = NIST §1.3.3.26; r measures linear association only; examples reasoned). Links ([[Multicollinearity]] etc.) and figure embed resolve. F-001 closed; no open findings.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.3.3 'Collinearity' (correlation matrix detects pairwise collinearity; multicollinearity among three or more variables with no high pairwise correlation; VIF = 1/(1 - R^2_{Xj|X-j})), printed p.102 (PDF p.112), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.11 'Scatterplot Matrix' (purpose: check pairwise relationships between variables), fetched 2026-10-05 (per-request Cloudflare token makes the hash fetch-specific), sha256:471a44f7e196205e2a95fb6e3a52bbf4c450be12163411f0a9791101bd9de043 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterb.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', fetched 2026-10-05, sha256:0828907b442403df9720ca82f9ed00c3b60431f45af818a4ee9d70970eee5de3 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm
- note: Medium as before: overplotting remedies are practice advice not found in a source read; every other claim rank-2/3 confirmed.

## [C-003] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- note: Precision note on F-001/R: the simulated max |pairwise r| was 0.451 (theoretical 1/sqrt(5) = 0.447) and VIF(X6) = 487 (seed 1, n = 10000).
