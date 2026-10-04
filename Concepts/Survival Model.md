---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:b2fc5b6c9b42997ea95ee216af06848eb38ece0fbb72341419a0d23f6013cd5c
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.1 pp.1-2 (S(x) = l_x/l_0, non-increasing, S(0) = 1, f = -S'), §2.2 pp.37-42 (tpx = S(x+t)/S(x), tqx = 1 - tpx, μ = f/S, S = exp(-∫μ), exponential S = e^{-μx}) and §2.5 p.59, sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), 'Distribution and Quantile Functions', Reliability section, html sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.4-5 (npx = l_{x+n}/l_x, nqx = 1 - npx), pp.10-11 (hazard rate for mortality = force of mortality; continuous survival functions covered elsewhere in the syllabus), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Survival Model.md
---

A **Survival Model** describes the distribution of a lifetime random variable $T \geq 0$, representing the time until death or failure. The model is characterized by the **survival function** $S(t)$, which gives the probability of surviving beyond time $t$.

> $$S(t) = P(T > t)$$

> $$= 1 - F(t)$$

> $$f(t) = -S'(t)$$

> $$= F'(t)$$

- $S(0) = 1$, $S(\infty) = 0$, and $S(t)$ is non-increasing
- The conditional probability of dying between ages $x$ and $x+t$, given alive at $x$, uses **actuarial notation**: $_tq_x = P(T_x \leq t)$ and $_tp_x = P(T_x > t) = S(x+t)/S(x)$
- $_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$
- The **[[Hazard Rate]]** $\mu(t)$ (force of mortality) links $f$, $S$: $f(t) = \mu(t)\,S(t)$

**Key relationship:**

$$S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)$$

![[Media/Figures/Survival_Model.svg|340]]

> [!example]- Probability of Surviving to Age 75 Given Alive at 70 {Example}
> Suppose $S(t) = e^{-0.02t}$ for $t \geq 0$ (constant force of mortality). Find the probability that a life aged 70 survives to age 75.
>
> > [!answer]-
> > $${_5}p_{70} = \frac{S(75)}{S(70)} = \frac{e^{-0.02(75)}}{e^{-0.02(70)}} = e^{-0.02(5)} = e^{-0.1} \approx 0.9048$$

> [!example]- Finding the PDF from a Survival Function {Example}
> A survival function is given by $S(t) = \left(1 - \frac{t}{100}\right)^2$ for $0 \leq t \leq 100$. Find $f(t)$.
>
> > [!answer]-
> > $$f(t) = -S'(t) = -2\left(1 - \frac{t}{100}\right)\cdot\left(-\frac{1}{100}\right) = \frac{2}{100}\left(1 - \frac{t}{100}\right)$$
