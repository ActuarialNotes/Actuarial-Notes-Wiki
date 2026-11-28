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

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-masi-check-A1-2026-10-30
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff check: symmetry bullet added, frontmatter untouched; odd central moments zero against Joyce (Clark) and Lancaster MATH230 (replacing the writer's Wikipedia citation), mean and skewness and failed converse against Siegrist 4.4. masi-an-038's uniform(-100,100) scenario not on the page (generic uniform on (-a, a) only). G8: MAS-I.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 10.3 moments and moment generating function (mu_n = E(X^n), g(t) provided this series converges, mu_n = g^(n)(0), series will not converge for all t), Theorems 6.2 and 6.6, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Pareto A.2.3.1 (PDF p.8), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal A.5.1.1 (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.11 Measures of Skewness and Kurtosis (fetched 2026-09-27), sha256:e47d203aad5f3b584e818850bb3e51a89b29ed1d7ca9981f7dbffe3c5f94f165 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994 pp.101-182, lognormal approximation and eq. (10), printed pp.117-118 (PDF pp.18-19), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Joyce, Moments and the moment generating function, Math 217 Probability and Statistics, Clark University, Fall 2014: 'A distribution that's symmetric about its mean has 0 skewness. (In fact all the odd central moments are 0 for a symmetric distribution.)', sha256:94f50359ff49bc2d3e2fdca2efd8b8f54013c707fb79aeeb966dc8611878332b — https://mathcs.clarku.edu/~djoyce/ma217/moment.pdf; Lancaster University MATH230 notes, Appendix C 3.3 Odd central moments of symmetric distributions: for odd r >= 3, finite r-th moment and density symmetric about the mean give r-th central moment zero — https://lancaster.ac.uk/~prendivs/accessible/math230/math230_notes.tex/A3.S3.html; Siegrist, 4.4 Skewness and Kurtosis: symmetric about a gives E(X) = a and skew(X) = 0; 'The converse is not true—a non-symmetric distribution can have skewness 0' — https://www.randomservices.org/random/expect/Skew.html

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:05Z/9825
- date: 2026-11-06
- status_set: verified
- confidence: high
- checks_run: Raw/central moments; mu_2=E[X^2]-mu^2 (G&S Thm 6.6); mu_3 expansion and skewness definition, symmetric -> skewness 0, converse false, normal kurtosis 3, exponential skewness 2 and kurtosis 9 free of scale (Siegrist 4.4). Exponential moments n! theta^n and MGF (LM A.3.3.1) recomputed: 1e3, 2e6, 6e9, 2.4e13; mu_2=1e6, mu_3=2e9, skew 2, kurt 9 (agree). M^(n)(0)=E[X^n] on an open interval about 0 (Siegrist 4.6); gamma t<1/theta and E[X^k] (LM A.3.2.1); lognormal E[X^k] (LM A.5.1.1); LM gives no M(t) for lognormal or Pareto (A.5.1.1, A.2.3.1 read); Pareto moments only for n<alpha (Siegrist 4.6, LM). Odd moments 0 under symmetry: Siegrist 4.4 argument and odd standard normal moments 0 (4.6). Try-its recomputed: discrete claim mu_2=36,100, mu_3=9,024,000, skew 1.316; MGF (1-500t)^-3 -> 1500, 3e6, var 750,000 = alpha theta^2; Mack lognormal sigma^2=ln 1.0625=0.06062, mu=2.2723, 95th pct 14.55 vs normal 14.11, median 9.70 (agree). Exam 7 bullet against Mack (1994) pp.117-118 eq.(10) and Exam 7 outline listing. Links resolve.
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.4 Skewness and kurtosis: skw = E[((X-mu)/sigma)^3]; symmetric -> skw 0, converse false; mu_3 = E(X^3)-3mu E(X^2)+2mu^3; normal kurtosis 3; exponential skw 2, kur 9, sha256:45d1ae0c75cf3412cbf7e56ea88b6715cbd7520b581ff1e2808468f3d5b534c2 — https://www.randomservices.org/random/expect/Skew.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.6 Generating functions: M^(n)(0)=E(X^n) when M finite on an open interval about 0; Pareto E(X^n)=inf for n>=a, M(t)=inf for t>0; lognormal has all moments but infinite MGF; odd standard normal moments 0; sum of independent normals normal, sha256:40fa48baaa2d9caa1ce28569da70af31c2cf65cd86f0fe091974481ad6a2b625 — https://www.randomservices.org/random/expect/Generating.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, printed pp.117-118 (PDF pp.18-19): normal 95% interval R +- 2 s.e.; lower limit negative when s.e. > 50% of R and the distribution is rather skewed; lognormal with equal mean and variance, eq. (10) sigma^2 = ln(1 + s.e.^2/R^2), mu = ln R - sigma^2/2; percentiles from it, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; CAS, Exam 7 Content Outline, Fall 2026, Complete text references: Mack (1994) and Shapland (2016) on the syllabus (pp.4-5), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Full re-pass after the Exam P teaching-style rewrite: every claim and number on the rewritten page checked; checker is not the writer. Numbers recomputed in python before comparing with the page.

## [F-003] MGF rule stated without its existence condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: major
- status: open
- locus: The moments from the moment generating function
- claim: The nth derivative of M_X at 0 is the nth moment, with no condition on M_X.
- evidence: Siegrist §4.6: M^(n)(0) = E(X^n) when M is finite on an open interval about 0, and 'the moment generating function may not exist' even when moments do. Siegrist's Pareto and lognormal examples have infinite MGFs for t > 0. The log entry F-001/R (2026 revision) says the condition was added and the Pareto and lognormal were named, but the current text has neither. A student who differentiates an MGF that does not exist (for example the lognormal) gets no answer.
- source_rank: 2
- proposed_action: The moment generating function of $X$ is $M_X(t) = E[e^{tX}]$. If $M_X$ is finite on an open interval about 0, its $n$th derivative at 0 is the $n$th moment: $E[X^n] = M_X^{(n)}(0)$. Some distributions, such as the lognormal and the Pareto, have no such interval.
- applied: false
- fingerprint: 890c87c3c179

## [F-004] Positive skewness described as a right tail without the unimodal condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: minor
- status: open
- locus: The reading of skewness
- claim: A positive skewness means a long right tail.
- evidence: Siegrist §4.4: 'In the unimodal case, if the distribution is positively skewed then the probability density function has a long tail to the right'. Without unimodality a positive skewness does not describe the tail's shape. The symmetric-implies-zero part is correct (Siegrist §4.4 proves it for n = 3).
- source_rank: 3
- proposed_action: For a unimodal distribution, a positive skewness means a long right tail. Every odd central moment of a symmetric distribution is 0, so its skewness is 0.
- applied: false
- fingerprint: b1a09252d79c

## [F-005] Pareto trap says the formula returns a number at alpha = 2 and below
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: nit
- status: open
- locus: The trap on moments that do not exist
- claim: The Pareto formula for E[X^2] still returns a number when alpha <= 2.
- evidence: Tables A.2.3.1 (PDF p.8): E[X^k] = theta^k Gamma(k+1) Gamma(alpha - k) / Gamma(alpha), for -1 < k < alpha. At k = 2 this involves Gamma(alpha - 2), which is undefined at alpha = 2 (Gamma(0)) and at alpha = 1 (Gamma(-1)). It returns a number only for the non-integer alpha values in (0, 2) excluding 1.
- source_rank: 1
- proposed_action: The Pareto formula for $E[X^2]$ still returns a number for some $\alpha < 2$, and that number means nothing. Check $n < \alpha$ before using it.
- applied: false
- fingerprint: 2035dc9780ba

## [C-005] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: in_review
- checks_run: Blind (solved before opening the page, numpy/algebra): C6 E[X^2] = 2 theta^2 = 2,000,000; C12 E[N^2] = 3 + 2^2 = 7; C16 skewness = (E[X^3] - 3 mu E[X^2] + 2 mu^3)/sigma^3 = (6e9 - 6e9 + 2e9)/1e9 = 2 (sigma = 1000); C20 E[X] = theta, E[X^2] = 2 theta^2 from M(t) = (1 - theta t)^-1; C24 integral of 2x^-3 on (1,inf) is 1, E[X] = 2 finite, E[X^2] = integral of 2x^-1 diverges; C29 sigma^2 = ln(1 + 0.25) = 0.22314, sigma = 0.47238, mu = ln 100 - 0.11157 = 4.49360. Claim by claim: C1-C4 raw moment E[X^n] = integral x^n f(x) dx checked against Siegrist §4.1 (E[r(X)] = integral of r(x) f(x) dx, continuous change of variables) and G&S Def 6.1 (discrete sum). C5 convention needs no source. C6 example: Tables A.3.3.1 (PDF p.11) gives E[X^k] = theta^k k! for integer k, so n! theta^n is confirmed; the page's arithmetic matches. C7-C8 central moment E[(X-mu)^n]: consistent with the definition in Siegrist §4.4. C9-C11 variance: G&S Thm 6.6 (PDF p.266) gives V(X) = E(X^2) - mu^2. The page's C10 reads Var(X) = E[X^2] + mu^2, a sign error (finding 1). C11 (E[X^2] = Var + mu^2) is correct, and C12's example 3 + 4 = 7 is right when read with the correct formula. C13-C14 skewness = third central moment over sigma^3: Siegrist §4.4 gives skw(X) = E[((X-mu)/sigma)^3], matching. C15: Siegrist §4.4 proves E[(X-a)^3] = 0 for a symmetric distribution and says a symmetric distribution is unskewed, and 'the converse is not true'. The page's 'every odd central moment' is the same symmetry argument extended to all odd n; the excerpt proves only n = 3, so that generalisation is my reasoning, not a source reading (noted, not a finding). The 'positive skewness means a long right tail' sentence drops Siegrist's qualifier 'in the unimodal case' (finding 3). C16 example: expansion E[(X-mu)^3] = E[X^3] - 3 mu E[X^2] + 2 mu^3 matches Siegrist §4.4's formula (and my own expansion); each line of working recomputed: 0 + 2e9, variance 1e6, sigma 1000, skewness 2. Siegrist §4.4 also gives exponential skewness 2. C17-C18 MGF and derivatives: Siegrist §4.6 states M^(n)(0) = E(X^n) only when M is finite on an open interval about 0, and warns that a variable with moments may have no MGF. The page drops this condition (finding 2, major). The log's F-001/R says the condition was added; the current text does not have it. C19 E[e^X] = M(1) is the definition with t = 1, no finding. C20 example: M'(t) = theta (1 - theta t)^-2 and M''(t) = 2 theta^2 (1 - theta t)^-3; both match my derivatives and Tables A.3.3.1's M(t). C21-C22 'integral of x^-k from 1 to infinity converges only when k > 1': I checked this by hand (the integral is 1/(k-1) for k > 1 and diverges otherwise). No source excerpt I could reach states this bare integral, so it is my computation, not a source confirmation (listed under unsourced). The Tables A.2.3.1 Pareto range -1 < k < alpha (PDF p.8) is consistent with C23. C23 Pareto: Tables A.2.3.1 (PDF p.8) gives E[X^k] finite for -1 < k < alpha, so E[X^n] is finite for n < alpha. Confirmed. C24 example: density integrates to 1 and the working matches: E[X] = 2, E[X^2] diverges; consistent with C23 (alpha = 2). C25-C27 lognormal: Mack (1994) eq. (10), printed p.118 (PDF pp.18-19): sigma^2 = ln(1 + (s.e./R)^2) and mu = ln R - sigma^2/2, matching the page's C26-C27 with m = R and s = s.e. Confirmed. C28: Mack uses it to fit the reserve and read percentiles (same excerpt). C29 example: sigma^2 = ln(1.25) = 0.2231, mu = ln 100 - 0.1116 = 4.4936, matching my blind answers. C30 trap: the Pareto E[X^2] formula Gamma(alpha - 2) (Tables A.2.3.1, PDF p.8) is undefined at alpha = 1 and 2 (poles of Gamma at 0 and -1), so 'still returns a number when alpha <= 2' is wrong at those two values (nit, finding 4). The advice 'check n < alpha' is correct. Examples recomputed: 6 (C6, C12, C16, C20, C24, C29).
- sources_checked: https://www.randomservices.org/random/expect/Generating.html, §4.6 Generating functions, The Moment Generating Function, sha256:40fa48baaa2d9caa1ce28569da70af31c2cf65cd86f0fe091974481ad6a2b625 — https://www.randomservices.org/random/expect/Generating.html; https://www.randomservices.org/random/expect/Skew.html, §4.4 Skewness and kurtosis, Skewness, sha256:45d1ae0c75cf3412cbf7e56ea88b6715cbd7520b581ff1e2808468f3d5b534c2 — https://www.randomservices.org/random/expect/Skew.html; https://www.randomservices.org/random/expect/Properties.html, §4.1 Expected value, continuous distribution and change of variables, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; https://math.dartmouth.edu/~prob/prob/prob.pdf, §6.2 Theorem 6.6, PDF p.266 (printed p.258), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf, printed pp.117-118, eq. (10), PDF pp.18-19, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf, A.2.3.1 Pareto, PDF p.8; A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf
