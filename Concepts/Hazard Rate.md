---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9b1bfed525264c281942c0b6e27f31fc09a58099d5c379ade946ddb0e175cd3d
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §2.2 pp.38-44 (force of mortality as limiting death rate; also failure rate / hazard intensity; μ = f/S = -d/dx ln S; S = exp(-∫μ); exponential = constant force; Weibull γ>1 increasing, 0<γ<1 decreasing; increasing = aging, decreasing = burn-in; Gompertz-Makeham A + Bc^x, Gompertz A = 0, increasing for c > 1, convex for B > 0), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), pp.10-11 and footnote 3 (hazard rate for mortality = force of mortality; λ(t); cumulative hazard), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hazard Rate.md
---

The **Hazard Rate** $\mu(t)$ (also called the **force of mortality** in life contingencies, or the **failure rate** in reliability) is the instantaneous rate of failure at time $t$ given survival to $t$.

> $$\mu(t) = \frac{f(t)}{S(t)}$$

> $$= -\frac{d}{dt}\ln S(t)$$

> $$S(t) = \exp\!\left(-\int_0^t \mu(s)\,ds\right)$$

- Also written $h(t)$ or $\lambda(t)$ depending on context; in life tables it is $\mu_x$
- A **constant** hazard rate $\mu(t) = \mu$ corresponds to the [[Exponential Distribution|Exponential]] distribution: $S(t) = e^{-\mu t}$
- The **cumulative hazard function** $H(t) = \int_0^t \mu(s)\,ds = -\ln S(t)$
- An **increasing** hazard rate indicates aging (e.g., Weibull with shape $> 1$)
- A **decreasing** hazard rate indicates infant-mortality effects (Weibull with shape $< 1$)

**Gompertz–Makeham model (common in life insurance):**
$$\mu_x = A + Bc^x, \quad A \geq 0,\, B > 0,\, c > 1$$

![[Media/Figures/Hazard_Rate.svg|340]]

> [!example]- Computing the Hazard Rate from a Survival Function {Example}
> The survival function is $S(t) = e^{-0.05t^2}$. Find the hazard rate $\mu(t)$.
>
> > [!answer]-
> > $$\mu(t) = -\frac{d}{dt}\ln S(t) = -\frac{d}{dt}(-0.05t^2) = 0.10t$$
> > The hazard rate increases linearly with time, indicating an aging population.

> [!example]- Recovering the Survival Function from a Hazard Rate {Example}
> A force of mortality is $\mu(t) = 0.02 + 0.001t$. Find $S(5)$.
>
> > [!answer]-
> > $$H(5) = \int_0^5 (0.02 + 0.001t)\,dt = \left[0.02t + 0.0005t^2\right]_0^5 = 0.10 + 0.0125 = 0.1125$$
> > $$S(5) = e^{-0.1125} \approx 0.8936$$
