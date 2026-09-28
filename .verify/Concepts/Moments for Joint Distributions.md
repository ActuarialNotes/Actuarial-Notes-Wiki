---
target: Concepts/Moments for Joint Distributions.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: E[X], E[Y], E[XY], E[g(X,Y)] as double sums over the joint pmf = change-of-variables theorem (Siegrist, discrete case, X a random vector); Cov = E[XY]-E[X]E[Y] (Siegrist Cov; G&S Ex 6.3.17a); independent implies E[XY]=E[X]E[Y] and Cov=0 (Siegrist; G&S Ex 6.3.17b); scope discrete-only matches syllabus 3c; example recomputed before reading: E[XY]=0.4, E[X]=0.5, E[Y]=0.6, Cov=0.10 - agrees; links and figure embed resolve
- sources_checked: Siegrist, Random (randomservices.org), Expected Value > Basic Properties, Change of Variables Theorem, discrete case E[r(X)] = sum_{x in S} r(x) f(x) for X with values in a general set S, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.3.17(a)-(b) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
