---
target: Concepts/Weibull Distribution.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: formulas diffed against CAS table A.3.2.3 and A.1; variance from the table's E[X^k]; hazard, minimum, exponential link and inversion against Siegrist; LEV formula checked numerically (theta=2000, tau=0.5, x=3000: table formula 1385.19 = integral of S 1385.19); examples recomputed in python before comparing (P(X>5000) = 0.2057; mean 4000, Var 8.0e7, sd 8944; h(500) = 0.000500, h(5000) = 0.000158; series system P(T>3) = 0.6977, E[T] = 4.431; single sensor 0.9139, 8.862); links resolve exactly
- sources_checked: CAS Exam MAS-I Tables, Appendix A.3.2.3 Weibull (theta, tau): f(x) = tau (x/theta)^tau e^-(x/theta)^tau / x, F(x) = 1 - e^-(x/theta)^tau, E[X^k] = theta^k Gamma(1 + k/tau) for k > -tau, E[(X^x)^k] = theta^k Gamma(1+k/tau) Gamma[1+k/tau; (x/theta)^tau] + x^k e^-(x/theta)^tau, mode theta((tau-1)/tau)^(1/tau) for tau > 1 else 0, PDF p.12; A.1 incomplete gamma Gamma(alpha; x) = (1/Gamma(alpha)) int_0^x t^(alpha-1) e^-t dt, PDF p.8, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Weibull' page: quantile F^-1(p) = b[-ln(1-p)]^(1/k); failure rate R(t) = k t^(k-1)/b^k, decreasing for k<1, constant for k=1, increasing for k>1; shape 1 = exponential with scale b; Z^k standard exponential; minimum of n iid Weibull(k, b) is Weibull(k, b/n^(1/k)), sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f — https://www.randomservices.org/random/special/Weibull.html; Frees et al., Loss Data Analytics (open text), Ch 3 'Modeling Loss Severity': §3.2.3 Weibull Distribution (hazard decreasing for shape < 1, constant for 1, increasing for > 1), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.viii (PDF p.10): §2.2.3 Weibull distribution p.51, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf
- note: All formulas agree with the CAS MAS-I table; all example numbers reproduce. Confidence medium: hazard-rate shape, the minimum-of-a-sample result and the inversion formula rest on Siegrist and Loss Data Analytics (rank 3). Tse's §2.2.3 notation not readable (contents only).

## [C-002] Notation slip in C-001's source and checks text
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- locus: C-001 sources_checked / checks_run
- note: In C-001 (and the block's first source line) the limited expected value is written 'E[X^x]' / 'E[(X^x)^k]' / 'E[X^<limit>]'. The '^' there stands for the minimum operator (the tables' E[X ∧ x], E[(X ∧ x)^k]), not a power: read 'E[X^3000] = 840' as E[X ∧ 3000] = 840, and so on. The numbers and the table formulas cited are unchanged.
