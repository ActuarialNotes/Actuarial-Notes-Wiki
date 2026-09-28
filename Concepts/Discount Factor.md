---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:81976b166811f6c61d8a1dd9b09e5afc854c2d4a0f073ca4e139f6106de0137d
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.79, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discount Factor.md
---

The **discount factor** $v$ is the [[Present Value]] of $1$ payable one period in the future:

> $$v = \frac{1}{1+i}$$

> $$= 1 - d$$

- $i$ is the effective [[Interest Rate]] and $d$ is the [[Discount Rate]].
- The $n$-period discount factor is $v^n = (1+i)^{-n}$.
- The discount factor converts a future cash flow to its present value:

> $$\text{PV} = C \cdot v^n$$

> $$= \frac{C}{(1+i)^n}$$

- Under [[Force of Interest]] $\delta$, the discount factor is $v = e^{-\delta}$ per period.

![[Media/Figures/Discount_Factor.svg|340]]

> [!example]- Present Value Using Discount Factor {Example}
> Find the present value of $10{,}000$ due in 5 years at an effective annual rate of 4%.
>
> > [!answer]-
> > $$v^5 = (1.04)^{-5} = 0.82193$$
> > $$\text{PV} = 10{,}000 \times 0.82193 = 8219.27$$
