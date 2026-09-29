---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:53269b8fa4c9eb8e442b3c7e07e6e09be30475f76ac2d7c71b06ba3130ffb101
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accumulated Value.md
---

The **accumulated value** (AV) is the value at a future time $t$ of a cash flow (or series of cash flows), grown forward using the [[Accumulation Function]] $a(t)$. It is the time-$t$ analogue of [[Present Value]]: where PV discounts back to time 0, AV accumulates forward to time $t$:

> $$AV = PV \cdot a(t)$$

- Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.
- The ratio $a(t)/a(s)$ for $t > s$ is the **accumulation factor** from $s$ to $t$: the value at time $t$ of 1 deposited at time $s$. Under compound interest it equals $(1+i)^{t-s}$; under a [[Variable Force of Interest|force of interest]] $\delta_r$ it equals $\exp\left(\int_s^t \delta_r\,dr\right)$.
- For a series of cash flows $C_{t_k}$ occurring at times $t_k \leq t$ — under compound interest, a force of interest, or any accumulation function a question gives other than simple interest — each cash flow is carried forward by its own accumulation factor:

> $$AV = \sum_k C_{t_k} \cdot \frac{a(t)}{a(t_k)}$$

- Under compound interest at rate $i$ this is:

> $$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$

- **[[Simple Interest]] is the exception.** When a question specifies simple interest, SOA measures $t$ in $a(t) = 1 + it$ from the moment each cash flow occurs, so each cash flow grows by $1 + i(t - t_k)$ — not by $a(t)/a(t_k) = (1+it)/(1+it_k)$:

> $$AV = \sum_k C_{t_k} \bigl[1 + i\,(t - t_k)\bigr]$$

![[Media/Figures/Accumulated_Value.svg|340]]

> [!example]- Accumulated Value of a Savings Plan {Example}
> An investor deposits \$$500$ today and \$$800$ two years from now into an account earning $i = 5\%$ per year effective. What is the total accumulated value at the end of 4 years?
>
> > [!answer]-
> > Accumulate each deposit to time 4:
> > $$AV = 500 \times (1.05)^4 + 800 \times (1.05)^2$$
> > $$= 500 \times 1.21551 + 800 \times 1.10250$$
> > $$= 607.75 + 882.00 = \$1{,}489.75$$

> [!example]- Deposits Earning Simple Interest {Example}
> An account credits simple interest at $10\%$ per year. A policyholder deposits \$$100$ at time 0 and another \$$100$ at time 1. What is the accumulated value at time 3?
>
> > [!answer]-
> > Each deposit earns simple interest from its own deposit date:
> > $$
> > \begin{align*}
> > AV &= 100\,(1 + 0.10 \times 3) + 100\,(1 + 0.10 \times 2) \\
> > &= 130 + 120 \\
> > &= \$250
> > \end{align*}
> > $$
> > Carrying the second deposit by the ratio $a(3)/a(1) = 1.3/1.1$ instead would give $100(1.3) + 100(1.3/1.1) = 248.18$ — not SOA's convention for simple interest.
