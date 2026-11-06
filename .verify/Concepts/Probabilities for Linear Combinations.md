---
target: Concepts/Probabilities for Linear Combinations.md
created: 2026-09-28
---

## [F-001] Discrete half of syllabus outcome 3g not covered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page
- claim: Page treats only linear combinations of independent normal random variables.
- evidence: SOA Probability Exam syllabus Nov 2026, Topic 3 outcome g: "Calculate probabilities for linear combinations of independent discrete random variables as well as for continuous normal random variables." The page, which carries this outcome as its title, covers only the normal case (lead, formula block, single example); nothing addresses the discrete case (the distribution of a sum of independent discrete variables, e.g. by convolution). What the page does state is correct (G&S Example 7.5, printed p.294, PDF p.302).
- source_rank: 1
- proposed_action: Author decision: add the discrete case (convolution of independent discrete variables, with an example) or link the page that covers it.
- applied: false
- fingerprint: 43e7326a8a2a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: L ~ N(sum c_i mu_i, sum c_i^2 sigma_i^2) for independent normals: normality from G&S Example 7.5 (sum of independent normals is normal with mean mu1+mu2, variance sigma1^2+sigma2^2) and G&S PDF p.290 exercise (rho X + sqrt(1-rho^2) V standard normal, a sum of scaled independent normals); mean and variance from G&S Thms 6.10, 6.14, 6.16. Independence condition stated. Example recomputed before reading: mean 300, SD sqrt(325)=18.028, z=2.219 -> 2.22, SOA table Phi(2.22)=0.9868, P=0.0132 (agrees). CLT pointer consistent with syllabus 3i. Link Central Limit Theorem resolves; figure exists; LaTeX fine.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Example 7.5 Sum of Two Independent Normal Random Variables (printed p.294, PDF p.302), Ex. 6.3 on rho X + sqrt(1-rho^2) V (printed p.282, PDF p.290), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P normal distribution table (rev. 4/29/21), row z=2.2 (column .02 = 0.9868), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formula and example verified; open minor F-001 is a syllabus-coverage gap, not an error.

## [F-002] CLT bullet applied to any non-normal independent variables
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 1, line 20
- claim: For non-normal independent random variables, the [[Central Limit Theorem]] provides an approximation for large n
- evidence: G&S Thm 9.4 (PDF p.351) and Thm 9.6 (PDF p.365) state the CLT for S_n, a sum of independent variables with a common distribution having mean mu and variance sigma^2; SOA Nov 2026 syllabus outcome 3i limits it to linear combinations of i.i.d. variables. The bullet drops both the identical-distribution and finite-variance conditions.
- source_rank: 3
- proposed_action: Restrict to sums or means of many i.i.d. variables with finite variance and link Normal Approximation.
- applied: true
- fingerprint: 46b3903569c5

## [F-001/R] Discrete half of outcome 3g added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Lead now covers both exact cases; added P(X+Y=s) = sum over x of P(X=x)P(Y=s-x) for independent integer-valued X, Y (G&S Def. 7.1, convolution, PDF p.294; S3 as a further convolution, same section), a bullet that independent Poisson variables sum to a Poisson with the means added (SOA sample solution Q124, PDF p.37; Siegrist Poisson page), and a worked discrete example: P(X+Y=0) = 0.30, P(X+Y=1) = 0.38, P(X+Y >= 2) = 0.32, cross-checked as 0.24 + 0.08 (recomputed).

## [F-002/R] CLT bullet restricted to i.i.d. sums and means with finite variance
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Bullet now reads: for the sum or mean of many i.i.d. non-normal variables with finite variance, the CLT gives an approximation instead, see [[Normal Approximation]] (G&S Thms 9.4, 9.6).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 and the CLT bullet: normal closure (G&S Example 7.5), convolution (G&S Def. 7.1), Poisson additivity (Q124; Siegrist), CLT conditions (Thms 9.4, 9.6). Examples recomputed: sigma_L = sqrt(325) = 18.03, z = 2.22, 1 - 0.9868 = 0.0132; discrete 1 - 0.30 - 0.38 = 0.32 = 0.24 + 0.08.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 7.1 convolution of independent integer-valued variables (printed p.286, PDF p.294), Example 7.5 sum of two independent normals (PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q124 (sum of independent Poisson variables is Poisson with the means added, PDF p.37), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Siegrist, Random (randomservices.org), The Poisson Process > The Poisson Distribution (closed under independent sums), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; SOA Exam P normal distribution table (rev. 4/29/21), row z = 2.2 (column .02 = 0.9868), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf

## [F-003] CLT bullet omits the finite-variance condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- severity: minor
- status: open
- locus: opening bullets, bullet 4
- claim: For a sum of many i.i.d. terms, the [[Central Limit Theorem]] gives an approximate normal distribution instead.
- evidence: Grinstead & Snell Thm 9.4 (PDF p.351) and Thm 9.6 (PDF p.365) require the common distribution to have expected value mu and variance sigma^2; the Cauchy sum of G&S Example 7.6 (PDF p.302) is the counterexample. The resolution of this page's F-002 (2026-09-28) restricted the bullet to i.i.d. sums with finite variance; the rewrite kept i.i.d. but dropped finite variance.
- source_rank: 3
- proposed_action: Add the hypothesis: 'For a sum of many i.i.d. terms with finite variance, ...'.
- applied: true
- fingerprint: 4ba50a085b3f

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- resolves: F-003
- status: resolved
- note: Applied in this pass: bullet now reads 'For a sum of many i.i.d. terms with finite variance', matching G&S Thms 9.4/9.6 (PDF pp.351, 365).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T17:59Z/b51f
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Discrete sum via joint table and convolution of independent marginals: G&S Def. 7.1; continuous convolution integral: G&S Thm 7.1; two i.i.d. exponentials sum to gamma (density lambda^2 z e^{-lambda z}): G&S PDF p.301, tail e^{-s/theta}(1+s/theta) recomputed; sums of independent normals: G&S Ex. 7.5; independent Poisson sum: Siegrist Poisson; CLT with finite variance (F-003 fixed): G&S Thms 9.4/9.6; continuity correction: G&S PDF p.340. Running example table (X auto 0-1, Y home 0-2) recomputed in python before reading the page's figures: E[X]=0.40, E[Y]=0.70, E[Y^2]=1.02, Var(X)=0.24, Var(Y)=0.53, E[XY]=0.40, Cov=0.12, Var(X+Y)=1.01. T distribution 0.36/0.28/0.26/0.10 and independent 0.276/0.412/0.248/0.064; P(T>=2)=0.36 vs 0.312; P(10X+5Y>=15)=0.30. Normal: P(Z>1)=0.1587, P(Z>-1)=0.8413 (SOA table); uniform triangle 0.125; C ~ N(110,101) with continuity correction z=1.54, 0.062 (table 0.9382). Try-its: sigma=18.03, z=2.22, 0.0132 (table 0.9868); 0.30, 0.38, 0.32 (direct 0.24+0.08); 2e^{-1.5}-e^{-3}=0.3965 (quad). Links resolve; $$ balanced.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 14.4 The Poisson Distribution: E(N)=var(N); sum of independent Poisson(a), Poisson(b) is Poisson(a+b), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html; SOA Exam P normal distribution table (rev. 4/29/21), standard normal table, Phi(1.00)=0.8413, Phi(1.54)=0.9382, Phi(2.22)=0.9868, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Rewritten page re-verified after applying F-003 (finite-variance condition on the CLT bullet).
