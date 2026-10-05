---
target: Concepts/Empirical Distribution.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: F_10 at 350/499/500/1000 = 0.3/0.3/0.6/0.7, sum 8,600, mean 860, sum of squares 6,159,000, variance 615,900, sd 784.79, n-1 version 684,333; E[X ^ 500] = 440, LER = 0.5116, Var-hat 0.024, SE 0.1549. Definition, binomial count, variance F(1-F)/n, consistency, n vs n-1 moments, plug-in principle, complete-data requirement and kernel smoothing checked against LDA and Siegrist. Links resolve; LaTeX balanced.
- sources_checked: Loss Data Analytics (Frees et al., open textbook), ch.4 §4.1.1.1-4.1.1.2: sample moment estimators (central moment divides by n; s^2 divides by n - 1 and is unbiased); E[g(X)] estimated by n^-1 sum g(X_i); F_n(x) = n^-1 sum I(X_i <= x), I(X <= x) Bernoulli; probability 1/n on each observation; discrete and right-continuous; kernel density estimators; product-limit (Kaplan-Meier) estimator for censored data, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Siegrist, Random, ch.6 §1 Estimators: for fixed y the empirical distribution function F_n(y) is the sample mean of 1(Y <= y), unbiased for F(y) and consistent; mean-square consistency implies consistency, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Loss Data Analytics, ch.3 Modeling Loss Severity, §3.4.1 Policy Deductibles: LER = (E(X) - E(Y^L))/E(X), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Tse §11.1, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §11.1.1 'Empirical distribution' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf
