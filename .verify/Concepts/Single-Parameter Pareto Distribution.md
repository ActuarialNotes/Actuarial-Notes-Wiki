---
target: Concepts/Single-Parameter Pareto Distribution.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: formulas diffed against CAS table A.4.1.4 (f, F, E[X^k], k=1 case of E[(X^x)^k]); variance re-derived from the table moments (alpha theta^2/((alpha-1)^2(alpha-2))); X - theta ~ two-parameter Pareto checked against A.2.4.1's F; exponential link and MLE against Siegrist; examples recomputed in python before comparing (sum ln(x_i/1000) = 2.98568, alpha-hat = 1.67466, P(X>3000) = 0.15885; mean 750, E[X^2000] = 734.375 also by numerical integration of S, P(X>2000) = 1.5625%); links resolve exactly
- sources_checked: CAS Exam MAS-I Tables, Appendix A.4.1.4 Single-parameter Pareto (alpha, theta): f(x) = alpha theta^alpha/x^(alpha+1), x > theta; F(x) = 1 - (theta/x)^alpha; E[X^k] = alpha theta^k/(alpha-k), k < alpha; E[(X^x)^k] = alpha theta^k/(alpha-k) - k theta^alpha/((alpha-k) x^(alpha-k)); mode theta; note 'only alpha is a true parameter. The value of theta must be set in advance', PDF p.14; and A.2.4.1 Pareto F(x) = 1 - (theta/(x+theta))^alpha, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Pareto' page: basic Pareto: if Z has the basic Pareto distribution with shape a then T = ln Z is exponential with rate a; pdf a b^a/x^(a+1) on [b, inf) for the scale-b family, sha256:2a199f9981591509d4e19a3350cf139c0dcfd448adbb65bcce0058b7c25a4d8b — https://www.randomservices.org/random/special/Pareto.html; Siegrist, Random, §7 Point Estimation, 'Maximum Likelihood' page, Pareto distribution with known scale b: MLE of a = n / sum(ln X_i - ln b), log-likelihood n ln a + n a ln b - (a+1) sum ln x_i, sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html
- note: All formulas agree with the CAS MAS-I table; all example numbers reproduce. Confidence medium: the exponential link and the MLE rest on Siegrist (rank 3). The table prints the LEV without the x >= theta condition the page adds; the condition is correct (the formula is for x above the support's lower bound).
