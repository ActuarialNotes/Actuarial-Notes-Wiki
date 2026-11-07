---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:07464bcf14ef63797c1a360e39f4561815c45aa78593df2d24026f308c3a847f
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.1 pp.1-2 (S(x) = l_x/l_0, non-increasing, S(0) = 1, f = -S'), §2.2 pp.37-42 (tpx = S(x+t)/S(x), tqx = 1 - tpx, μ = f/S, S = exp(-∫μ), exponential S = e^{-μx}) and §2.5 p.59, sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), 'Distribution and Quantile Functions', Reliability section, html sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.4-5 (npx = l_{x+n}/l_x, nqx = 1 - npx), pp.10-11 (hazard rate for mortality = force of mortality; continuous survival functions covered elsewhere in the syllabus), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Survival Model.md
---

![[Media/Figures/Survival_Model.svg|340]]

A **Survival Model** is the distribution of a lifetime $X$, the time from birth until death or failure, described by its survival function. The survival function of $X$ at age $x$ is the probability that the lifetime is greater than $x$:

> $$S(x) = P(X > x)$$

> $$S(x) = 1 - F(x)$$

- $F(x)$ is the [[Cumulative Distribution Function (CDF)|cumulative distribution function]] of $X$.
- $S(0) = 1$, and $S(x)$ is non-increasing and approaches 0 as $x$ grows.

The probability that the lifetime ends in an interval $(a, b]$ is $P(a < X \le b) = S(a) - S(b)$.

> [!example]- A lifetime has survival function $S(x) = 1 - x/100$ for $0 \le x \le 100$. What is the probability that a newborn survives to age 40, and what is the probability that it dies between ages 60 and 80? {Example}
> - The probability of surviving to age 40 is $S(40) = 1 - 0.4 = 0.6$.
> - The probability of dying between ages 60 and 80 is $S(60) - S(80) = 0.4 - 0.2 = 0.2$.

## Probabilities for a life aged $x$

A life aged $x$, written $(x)$, is known to have survived to age $x$. Its future lifetime is $T_x = X - x$, given $X > x$. The probability that $(x)$ survives $t$ more years is

> $${}_tp_x = \frac{S(x+t)}{S(x)}$$

The probability that $(x)$ dies within $t$ years is

> $${}_tq_x = 1 - {}_tp_x$$

When $t = 1$ the subscript $t$ is dropped, so $p_x = 1 - q_x$. The probability that $(x)$ dies between ages $a$ and $b$, with $x \le a < b$, is

> $$P(a < X \le b \mid X > x) = \frac{S(a) - S(b)}{S(x)}$$

Survival probabilities over consecutive periods multiply. The probability that $(x)$ survives $s + t$ years is

> $${}_{s+t}p_x = {}_sp_x \; {}_tp_{x+s}$$

> [!example]- A lifetime has survival function $S(x) = 1 - x/100$ for $0 \le x \le 100$. For a life aged 40, what is the probability of surviving to age 70, and what is the probability of dying between ages 60 and 80? {Example}
> - The probability of surviving from age 40 to age 70 is ${}_{30}p_{40} = S(70)/S(40) = 0.3/0.6 = 0.5$.
> - The probability of dying between ages 60 and 80, given survival to age 40, is $\frac{S(60) - S(80)}{S(40)} = \frac{0.4 - 0.2}{0.6} = 0.3333$.

## Survival function from the hazard rate

If the lifetime has [[Hazard Rate|hazard rate]] $h(x)$, the survival function is

> $$S(x) = \exp\left(-\int_0^x h(u)\,du\right)$$

In life contingencies the hazard rate at age $y$ is the force of mortality $\mu_y$. The probability that $(x)$ survives $t$ years is then

> $${}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)$$

> [!example]- A lifetime has hazard rate $h(x) = 1/(100 - x)$ for $0 \le x < 100$. What is the probability that a newborn survives to age 40? {Example}
> - The integral of the hazard rate is $\int_0^{40} \frac{du}{100 - u} = \ln \frac{100}{60} = 0.5108$.
> - The probability of surviving to age 40 is $S(40) = e^{-0.5108} = 0.6$.
> - This hazard rate gives the survival function $S(x) = 1 - x/100$ of the examples above.

## Density of the lifetime

The density of the lifetime $X$ is

> $$f(x) = -S'(x)$$

For a life aged $x$, the density of the future lifetime $T_x$ at time $t$ is

> $$f_x(t) = {}_tp_x\,\mu_{x+t}$$

> [!example]- A lifetime has survival function $S(x) = (1 - x/100)^2$ for $0 \le x \le 100$. What is its density at age 40? {Example}
> - Differentiating, $S'(x) = -\frac{2}{100}\left(1 - \frac{x}{100}\right)$.
> - The density is $f(40) = \frac{2}{100} \times 0.6 = 0.012$.

> [!trap] Measuring time from today instead of from birth
> The survival function is written in terms of age. For a life aged 40 under $S(x) = 1 - x/100$, the probability of dying within the next 10 years is $\frac{S(40) - S(50)}{S(40)} = \frac{0.1}{0.6} = 0.1667$, not $1 - S(10) = 0.1$.
