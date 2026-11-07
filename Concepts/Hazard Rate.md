---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:166c9076867e1da0116c3382b8eae0f13b8336feec8cc90822842d3d29161c2c
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §2.2 pp.38-44 (force of mortality as limiting death rate; also failure rate / hazard intensity; μ = f/S = -d/dx ln S; S = exp(-∫μ); exponential = constant force; Weibull γ>1 increasing, 0<γ<1 decreasing; increasing = aging, decreasing = burn-in; Gompertz-Makeham A + Bc^x, Gompertz A = 0, increasing for c > 1, convex for B > 0), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.10-11 and footnote 3 (hazard rate for mortality = force of mortality; λ(t); cumulative hazard), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hazard Rate.md
---

![[Media/Figures/Hazard_Rate.svg|340]]

A **Hazard Rate** is the instantaneous rate of death or failure of a lifetime $X$ at age $x$, given survival to age $x$. If $X$ has density $f(x)$ and [[Survival Model|survival function]] $S(x)$, the hazard rate is

> $$h(x) = \frac{f(x)}{S(x)}$$

> $$h(x) = -\frac{d}{dx} \ln S(x)$$

In life contingencies the hazard rate at age $x$ is called the force of mortality and is written $\mu_x$. In reliability it is called the failure rate.

> [!example]- A lifetime has survival function $S(x) = e^{-0.05x^2}$ for $x \ge 0$. What is its hazard rate at age 3? {Example}
> - The log of the survival function is $\ln S(x) = -0.05x^2$.
> - The hazard rate is $h(x) = -\frac{d}{dx}(-0.05x^2) = 0.1x$.
> - At age 3 the hazard rate is $h(3) = 0.3$.

## Cumulative hazard

The cumulative hazard function is the integral of the hazard rate:

> $$H(x) = \int_0^x h(u)\,du$$

The survival function is recovered from it as

> $$S(x) = e^{-H(x)}$$

For a life aged $x$, the probability of surviving $t$ years is

> $${}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)$$

> [!example]- A force of mortality is $\mu_x = 0.02 + 0.001x$. What is the probability that a newborn survives to age 5? {Example}
> - The cumulative hazard is $H(5) = \int_0^5 (0.02 + 0.001u)\,du = 0.10 + 0.0125 = 0.1125$.
> - The probability of surviving to age 5 is $S(5) = e^{-0.1125} = 0.8936$.

## Constant hazard rate

A lifetime with a constant hazard rate $h(x) = \lambda$ has an [[Exponential Distribution|exponential distribution]] with mean $\theta = 1/\lambda$, and its survival function is

> $$S(x) = e^{-\lambda x}$$

Because the hazard rate does not change with age, the probability of surviving $t$ more years is $e^{-\lambda t}$ at every age. With a constant force of mortality $\mu$, the one-year probabilities are $p_x = e^{-\mu}$ and $q_x = 1 - e^{-\mu}$.

> [!example]- A machine's lifetime is exponential with a mean of 5 years. What is its hazard rate, and what is the probability that a machine that is 3 years old works for 2 more years? {Example}
> - The hazard rate is $\lambda = 1/\theta = 1/5 = 0.2$ per year, at every age.
> - The probability of working 2 more years is $e^{-0.2 \times 2} = e^{-0.4} = 0.6703$, the same as for a new machine.

## Gompertz and Makeham laws of mortality

Makeham's law gives the force of mortality at age $x$ as

> $$\mu_x = A + Bc^x$$

- $A \ge 0$, $B > 0$ and $c > 1$ are constants.

Gompertz' law is the special case $A = 0$, so $\mu_x = Bc^x$.

> [!example]- Under Makeham's law with $A = 0.0002$, $B = 0.00003$ and $c = 1.1$, what is the force of mortality at age 60? {Example}
> - The age-dependent term is $Bc^{60} = 0.00003 \times 1.1^{60} = 0.009134$.
> - The force of mortality is $\mu_{60} = 0.0002 + 0.009134 = 0.009334$.

## Increasing and decreasing hazard rates

An increasing hazard rate describes ageing, as in human mortality and the [[Weibull Distribution|Weibull distribution]] with shape $\tau > 1$. A decreasing hazard rate describes a population whose worst risks fail early, as in the Weibull distribution with shape $\tau < 1$ and in many property and casualty risks. The direction of the hazard rate is one measure of [[Tail Weight|tail weight]].

> [!trap] Treating the hazard rate as a probability
> The hazard rate is a rate, not the probability of dying within a year, and it can be greater than 1. With a constant force of mortality of 0.5, the probability of dying within a year is $1 - e^{-0.5} = 0.3935$, not 0.5.
