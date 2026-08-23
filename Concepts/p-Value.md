---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:65f61dd1189fa99d9f7361f15cf300991deaca9bcb0f94023a2787a164135f99
  sources: []
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
