---
target: Concepts/Moment.md
created: 2026-09-28
---

## [F-001] MGF moment formula stated without the existence condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 3, line 22
- claim: The moment generating function M_X(t) = E[e^{tX}] produces every raw moment as E[X^n] = M_X^{(n)}(0).
- evidence: Grinstead & Snell sec. 10.3 (PDF pp.401-402, printed 393-394) defines g(t) = E(e^{tX}) "provided this series converges" before stating mu_n = g^(n)(0). The same bullet names the lognormal, whose moments all exist but which has no MGF: SOA Tables for Exam C give M(t) for the gamma and exponential (t < 1/theta) but none for the lognormal (PDF p.11) or the Pareto (A.2.3.1, PDF p.8, E[X^k] only for k < alpha). Rated minor: no wrong number results, but a reader may try to differentiate a lognormal MGF that does not exist.
- source_rank: 3
- proposed_action: State that M_X(t) must be finite on an open interval around 0, and note that the lognormal and Pareto have no MGF.
- applied: false
- fingerprint: daa0360af7db

## [F-002] Exam 7 bullet not supported by a source read this session
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 6 (Exam 7), line 25
- claim: An unpaid claim distribution is summarised by its moments: the mean (the central estimate), the standard deviation (the prediction error), the CV and the skewness.
- evidence: Mack (1994), CAS Forum Spring 1994, printed p.118 (PDF pp.18-19) supports only the second half of the bullet: it fits a lognormal to the reserve estimate and its standard error by matching mean and variance, sigma^2 = ln(1 + (s.e./R)^2), mu = ln R - sigma^2/2, and reads percentiles off it. Calling the standard deviation the "prediction error" and summarising by CV and skewness is not in Mack; it presumably paraphrases another Exam 7 reading (e.g. the Shapland monograph), which was not read this session. No Exam P claim is affected.
- source_rank: 3
- proposed_action: Check the bullet against the Exam 7 reading it paraphrases and cite it, or narrow it to what Mack (1994) says.
- applied: false
- fingerprint: fa50e6f38fa1

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: mu_n prime = E[X^n] = integral x^n f(x) dx vs G&S sec. 10.3; discrete sum vs G&S Thm 6.1; mu_2 = E[X^2] - mu^2 vs G&S Thm 6.6; skewness mu_3/sigma^3 and kurtosis mu_4/sigma^4 = 3 for a normal, and asymmetry / tail-weight readings, vs NIST 1.3.5.11; mu_3 raw-moment expansion follows from linearity (G&S Thm 6.2); exponential E[X^k] = theta^k k! (A.3.3.1), gamma theta^k (alpha+k-1)...alpha (A.3.2.1), lognormal exp(k mu + k^2 sigma^2/2), Pareto E[X^k] only for -1 < k < alpha (A.2.3.1) so alpha <= 2 means infinite variance; mu_n = g^(n)(0) vs G&S sec. 10.3; lognormal fit to mean and standard error vs Mack eq. (10). Examples recomputed before reading answers: exponential theta = 1000: E[X^2] = 2e6, E[X^3] = 6e9, variance 1e6, mu_3 = 2e9, skewness 2, agrees; lognormal CV 0.25: sigma^2 = ln 1.0625 = 0.060625, sigma = 0.24622, mu = 2.27227, x_0.95 = exp(2.67731) = 14.546, normal 14.1125, gap 0.433, median 9.701, agrees; z_0.95 = 1.645 by interpolation in the SOA normal table. Links resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 10.3 moments and MGF (PDF pp.401-402), sec. 6.2 Thm 6.6, sec. 6.1 Thm 6.1-6.2, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Pareto A.2.3.1 (PDF p.8), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.11 Measures of Skewness and Kurtosis (fetched 2026-09-27), sha256:e47d203aad5f3b584e818850bb3e51a89b29ed1d7ca9981f7dbffe3c5f94f165 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994 pp.101-182, lognormal confidence limits eq. (10), printed p.118 (PDF pp.18-19), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495 and Phi(1.65) = 0.9505, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf
- note: All formulas and both examples confirmed; two minor findings open (MGF existence condition; Exam 7 bullet only partly sourced).

## [F-001/R] MGF existence condition stated
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullet now says the MGF produces E[X^n] = M^(n)(0) only where it exists: finite for t in an interval around 0 (Pishro-Nik §6.1.3: exists if finite on [-a,a]; G&S sec. 10.3: provided the series converges, and in general it will not converge for all t), e.g. t < 1/theta for the exponential and gamma (Tables A.3.2.1, A.3.3.1); and that the Loss Models tables give no MGF for the lognormal or Pareto, whose moments come from their formulas directly.

## [F-002/R] Exam 7 bullet narrowed to what Mack (1994) says
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Unsourced claims removed (standard deviation called the prediction error; summary by CV and skewness). Bullet now states Mack (1994), printed pp.117-118 (PDF pp.18-19): a chain-ladder reserve R is measured by its standard error; when the reserve distribution is rather skewed, especially once s.e. exceeds 50% of R where the normal 95% interval lower limit turns negative, fit a lognormal with the same mean and variance, sigma^2 = ln(1 + s.e.^2/R^2), mu = ln R - sigma^2/2 (eq. 10), and read percentiles off it.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Re-verified after resolving F-001 and F-002: raw and central moments vs Pishro-Nik §6.1.3 and G&S sec. 10.3; mu_2 = E[X^2] - mu^2 vs G&S Thm 6.6; skewness mu_3/sigma^3 and kurtosis 3 for a normal vs NIST 1.3.5.11; closed forms exponential theta^k k!, gamma theta^k (alpha+k-1)...alpha, lognormal exp(k mu + k^2 sigma^2/2), Pareto E[X^k] only for k < alpha vs Tables; MGF existence vs Pishro-Nik §6.1.3 and G&S 10.3, M(t) with t < 1/theta for gamma/exponential and none listed for lognormal or Pareto vs Tables; Exam 7 bullet vs Mack pp.117-118 eq. (10). Examples recomputed: exponential 1000: E[X^2] = 2e6, E[X^3] = 6e9, variance 1e6, mu_3 = 2e9, skewness 2; lognormal CV 0.25: sigma^2 = 0.060625, sigma = 0.24622, mu = 2.27227, x_0.95 = 14.546 (z = 1.6449 from the SOA table), normal 14.1125, median 9.701 (all agree). Links resolve; LaTeX well formed.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 10.3 moments and moment generating function (mu_n = E(X^n), g(t) provided this series converges, mu_n = g^(n)(0), series will not converge for all t), Theorems 6.2 and 6.6, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Pareto A.2.3.1 (PDF p.8), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal A.5.1.1 (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.11 Measures of Skewness and Kurtosis (fetched 2026-09-27), sha256:e47d203aad5f3b584e818850bb3e51a89b29ed1d7ca9981f7dbffe3c5f94f165 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994 pp.101-182, lognormal approximation and eq. (10), printed pp.117-118 (PDF pp.18-19), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf
