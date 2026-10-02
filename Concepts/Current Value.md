---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:32201541116fa5c2c5d953c1dd0150ac512173cd232719e876b09ade39ade369
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.51, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Current Value.md
---

The **current value** of a cash flow stream is its value at a specified reference date $t$ — not necessarily today (present) or at the end (future). It is computed by accumulating the cash flows that occur before $t$ and discounting those that occur on or after $t$ to the reference date, using the applicable [[Interest Rate]] or [[Accumulation Function]]. When every cash flow is discounted it is the [[Present Value]]; when every one is accumulated, the [[Future Value]].

> $$\text{CV}_t = \sum_{k} C_k \cdot \frac{a(t)}{a(t_k)}$$

- $a(t)$ is the [[Accumulation Function]] and $C_k$ is the cash flow at time $t_k$; the ratio accumulates a cash flow with $t_k < t$ and discounts one with $t_k > t$.
- This form holds under [[Compound Interest]], a force of interest, or any accumulation function a question gives other than simple interest. Under compound interest at rate $i$:

> $$\text{CV}_t = \sum_{k} C_k\,(1+i)^{t - t_k}$$

- **[[Simple Interest]] is the exception.** When a question specifies simple interest, SOA starts each cash flow's simple interest on its own date, so a cash flow before $t$ grows by $1 + i(t - t_k)$ and one on or after $t$ is divided by $1 + i(t_k - t)$ — it is not moved by $a(t)/a(t_k)$ with $a(t) = 1 + it$:

> $$\begin{aligned} \text{CV}_t = {} & \sum_{t_k < t} C_k \bigl[1 + i(t - t_k)\bigr] \\ & + \sum_{t_k \geq t} \frac{C_k}{1 + i(t_k - t)} \end{aligned}$$

![[Media/Figures/Current_Value.svg|340]]

> [!example]- Value at an Intermediate Date {Example}
> Payments of $1000$ at time 0 and $1000$ at time 4 are made. Find the current value at time 2 using an effective annual rate of 5%.
>
> > [!answer]-
> > Accumulate the time-0 payment forward 2 years and discount the time-4 payment back 2 years:
> > $$\text{CV}_2 = 1000(1.05)^2 + 1000(1.05)^{-2} = 1102.50 + 907.03 = 2009.53$$
