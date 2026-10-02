---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:52441b54cc5ad8538ed2ad3395822554fa4433ad4a0153009bf5842edac4e9b1
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.84-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nominal Discount Rate Convertible m-thly.md
---

The **nominal discount rate convertible $m$-thly**, denoted $d^{(m)}$, is an annual discount rate under which interest is paid at the **beginning** of each of $m$ sub-periods per year at rate $d^{(m)}/m$.

- The relationship to the effective annual rate $i$ (and effective discount rate $d$) is:

> $$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d$$

> $$= v$$

> $$= \frac{1}{1+i}$$

> $$d^{(m)} = m\!\left[1 - v^{1/m}\right]$$

> $$= m\!\left[1 - (1+i)^{-1/m}\right]$$

- As $m \to \infty$, $d^{(m)} \to \delta$ (the [[Force of Interest]]).
- For a positive interest rate, $d^{(m)} < i^{(m)}$ for all $m$; more fully, $d < d^{(m)} < \delta < i^{(m)} < i$ for $m > 1$.

![[Media/Figures/Nominal_Discount_Rate_Convertible_m-thly.svg|340]]

> [!example]- Finding Nominal Discount Rate {Example}
> The effective annual interest rate is $6\%$. Find $d^{(12)}$.
>
> > [!answer]-
> > With $v = 1/1.06$:
> > $$
> > \begin{align*}
> > d^{(12)} &= 12\left[1 - (1.06)^{-1/12}\right] \\
> >   &= 12(1 - 0.9951560) \\
> >   &= 12(0.0048440) \\
> >   &= 0.058128 = 5.813\%
> > \end{align*}
> > $$
> > As expected, $d^{(12)} = 5.813\%$ is below $\delta = \ln 1.06 = 5.827\%$ and $i^{(12)} = 12\left[(1.06)^{1/12} - 1\right] = 5.841\%$.
