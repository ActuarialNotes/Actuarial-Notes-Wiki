---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3e8e2c1c259a1d2c9e3ee55bf40277683eefab0856cf1331e5267ef48aac375
  sources: []
  open_findings: 0
  log: .verify/Concepts/Nominal Interest Rate.md
---

The **nominal interest rate** $i^{(m)}$ is a quoted annual rate convertible (compounded) $m$ times per year. Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.

> $$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

- The two-way relationship with the effective annual rate $i$ is:

> $$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$

> $$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

- As $m \to \infty$ the nominal rate converges to the [[Force of Interest]]: $\displaystyle\lim_{m\to\infty} i^{(m)} = \delta = \ln(1+i)$.
- For a fixed effective rate, $i^{(m)}$ is a decreasing function of $m$ — more frequent compounding requires a smaller stated rate to achieve the same year-end accumulation.

![[Media/Figures/Nominal_Interest_Rate.svg|340]]

> [!example]- Converting a Nominal Rate to an Effective Rate {Example}
> A savings account advertises a nominal interest rate of $i^{(12)} = 6\%$ convertible monthly. Find the equivalent effective annual interest rate.
>
> > [!answer]-
> > The monthly periodic rate is $6\%/12 = 0.5\%$, so:
> > $$i = \left(1 + \frac{0.06}{12}\right)^{12} - 1 = (1.005)^{12} - 1 \approx 6.168\%$$
