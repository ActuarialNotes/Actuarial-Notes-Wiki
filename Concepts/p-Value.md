---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:65f61dd1189fa99d9f7361f15cf300991deaca9bcb0f94023a2787a164135f99
  sources:
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy): §3.1.2 p.67 (PDF p.77) p-value of the coefficient t-statistic; §3.2.2 p.77 (PDF p.87) each coefficient's p-value is 'the partial effect of adding that variable to the model' and with p = 100 null predictors about 5% of p-values fall below 0.05 by chance; §13.1.1 pp.556-558 (PDF pp.562-564) p-value definition, it is NOT the probability that H0 holds, it maps the statistic onto a number between 0 and 1, one- vs two-sided p-values (footnote 8), failing to reject may only reflect a small sample; §13.1.2 p.560 reject when p is below alpha, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Random, ch.8 §1 Introduction (P-value = smallest alpha for which H0 is rejected) and §2 Tests in the Normal Model (P-values 2[1 - Phi(|Z|)], 1 - Phi(Z), Phi(Z)), sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html ; sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 22 §22.1-22.2: p-value is the smallest alpha at which H0 is rejected, 'p is NOT equal to P(H0 | X)', and under the null P0(p-value <= u) = u for a continuous statistic (uniform on [0,1]), sha256:0770209dedee94e5af6d737ea4c6beb4f85386be3fa29e3d7d0c8335e56c56e5 — https://www.stat.cmu.edu/~siva/teaching/705/lec22.pdf"
    - "Penn State STAT 415 (2026 notes), Lesson 9 §9.4 (Def 9.5 P-value; two-tailed P-value = 2 x one-tailed) and Lesson 10 §10.4 (Wald statistic (theta-hat - c)/se, p = 2 Phi(-|Z*|)), sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html ; sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(2.50) = 0.9938, Phi(1.82) = 0.9656), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/p-Value.md
---

A **p-Value** is the probability, computed assuming the null hypothesis is true, of observing a test statistic at least as extreme as the one obtained. It converts any test statistic onto a common $0$–$1$ scale: reject $H_0$ when the p-value falls below the significance level $\alpha$.

> $$p = P(\text{test statistic at least as extreme as observed} \mid H_0)$$

> $$\text{reject } H_0 \iff p < \alpha$$

- "Extreme" is defined by the alternative: a one-sided $H_1: \theta > \theta_0$ uses one tail, a two-sided $H_1: \theta \ne \theta_0$ uses both, so the two-sided p-value is twice the one-sided one for a symmetric [[Sampling Distribution]]
- The p-value is **not** the probability that $H_0$ is true, and $1 - p$ is not the probability that $H_1$ is true — both are statements about the data given the hypothesis, not the reverse
- It is the smallest $\alpha$ at which the observed data would reject $H_0$, which is why software reports it instead of a fixed accept/reject verdict
- A p-value just above $\alpha$ is weak evidence, not evidence of no effect; with low [[Power of a Test|power]] a real effect routinely produces $p > 0.05$
- Under $H_0$ (continuous test statistic), the p-value is $\text{Uniform}(0,1)$ — so testing many predictors produces small p-values by chance alone, the reason [[Variable Selection]] should not be run on p-values unchecked
- In [[Parameter Estimate Tables]] each coefficient's p-value tests $H_0: \beta_j = 0$ given the other terms in the model; it says nothing about the variable in isolation

![[Media/Figures/p-Value.svg|340]]

> [!example]- p-Value for a One-Sided Z-Test {Example}
> A test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ yields $z = 2.50$. Find the p-value and state the conclusion at $\alpha = 0.05$ and at $\alpha = 0.01$.
>
> > [!answer]-
> > $$p = P(Z > 2.50) = 1 - 0.9938 = 0.0062$$
> > Since $0.0062 < 0.05$ and also $< 0.01$, **reject $H_0$** at both levels. Had the alternative been two-sided, $p = 2(0.0062) = 0.0124$ — still significant at $5\%$ but no longer at $1\%$.

> [!example]- Reading a GLM Coefficient's p-Value {Example}
> A Poisson [[Generalized Linear Model]] reports a territory coefficient $\hat\beta = 0.184$ with standard error $0.101$. Compute the Wald test statistic and the two-sided p-value, and interpret it.
>
> > [!answer]-
> > $$z = \frac{0.184}{0.101} = 1.82 \ \Longrightarrow\ p = 2\,P(Z > 1.82) \approx 2(0.0344) = 0.069$$
> > At $\alpha = 0.05$ this coefficient is not significant, but $p = 0.069$ is far from conclusive evidence that the effect is zero — a multiplicative effect of $e^{0.184} = 1.20$ is still the best estimate. Decide with [[AIC]] or an analysis of [[Deviance]], plus business judgment, rather than on the p-value alone.
