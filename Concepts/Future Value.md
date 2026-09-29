---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:73e539fe0288c900f91479337c2d214e4472136cb7b3b01308e9dd1f1eb8203e
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Value.md
---

The **future value** (FV) of a cash flow is its [[Accumulated Value]] at a specified future date, accounting for the time value of money. Under [[Compound Interest]] at effective annual rate $i$:

> $$\text{FV} = \text{PV} \cdot (1+i)^n$$

- $n$ is the number of periods.
- Future value is the inverse operation of [[Present Value]]: discounting finds PV from FV, while accumulation finds FV from PV.
- For a series of cash flows $C_t$ at times $t = 0, 1, \ldots, n$, the future value at time $n$ is:

> $$\text{FV}_n = \sum_{t=0}^{n} C_t (1+i)^{n-t}$$

![[Media/Figures/Future_Value.svg|340]]

> [!example]- Saving for a Future Goal {Example}
> An investor deposits $500$ at the start of each year for 4 years at 6% effective annual interest. Find the accumulated value at the end of year 4.
>
> > [!answer]-
> > This is an [[Annuity Due]] with payments of $500$:
> > $$
> > \begin{align*}
> > \text{FV} &= 500(1.06)^4 + 500(1.06)^3 + 500(1.06)^2 + 500(1.06)^1 \\
> > &= 500 \cdot \ddot{s}_{\overline{4}|0.06} \\
> > &= 500 \times 4.63709 \\
> > &\approx 2318.55
> > \end{align*}
> > $$
