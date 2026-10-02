---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:3ba38beb7e4ed8a2ee24b797efd44b9f31342c7ce3b999a942402f43af04f8bc
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.14, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.30, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.80, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accumulation Function.md
---

The **accumulation function** $a(t)$ gives the accumulated value at time $t \geq 0$ of 1 unit invested at time 0. It must satisfy $a(0) = 1$ and be non-decreasing.

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- Four standard forms arise from different interest assumptions:

| Regime | $a(t)$ |
|---|---|
| Compound interest (rate $i$) | $(1+i)^t$ |
| Simple interest (rate $i$) | $1 + it$ |
| Constant [[Force of Interest]] $\delta$ | $e^{\delta t}$ |
| Time-varying force $\delta(t)$ | $\exp\!\left(\displaystyle\int_0^t \delta(s)\,ds\right)$ |

- The [[Force of Interest]] at any time is recovered from $a(t)$ by $\delta(t) = a'(t)/a(t) = \frac{d}{dt}\ln a(t)$.
- The **amount function** $A(t) = k \cdot a(t)$ gives the accumulated value of an initial investment of $k$.

![[Media/Figures/Accumulation_Function.svg|340]]

> [!example]- Accumulated Value Under Simple vs. Compound Interest {Example}
> An investor deposits \$$1{,}000$ at time 0. Compare the accumulated values at $t = 5$ years under (a) simple interest at $8\%$ and (b) compound interest at $8\%$.
>
> > [!answer]-
> > **(a) Simple interest:** $A(5) = 1{,}000 \times (1 + 0.08 \times 5) = 1{,}000 \times 1.40 = \$1{,}400.00$
> >
> > **(b) Compound interest:** $A(5) = 1{,}000 \times (1.08)^5 = 1{,}000 \times 1.46933 \approx \$1{,}469.33$
> >
> > Compound interest produces a higher accumulated value beyond $t = 1$ because interest itself earns interest.
