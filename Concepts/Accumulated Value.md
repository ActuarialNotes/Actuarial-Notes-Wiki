---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c22a12c1dbaba8dc55ce80d134dc17e9c1aab4dee39739ae2c1c1e93f97005d2
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments, learning objective and outcome b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Remark 4.3, SOA/CAS convention), PDF p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Accumulated Value.md
---

The **accumulated value** (AV) is the value at a future time $t$ of a cash flow (or series of cash flows), grown forward using the [[Accumulation Function]] $a(t)$. It is the time-$t$ analogue of [[Present Value]]: where PV discounts back to time 0, AV accumulates forward to time $t$:

> $$AV = PV \cdot a(t)$$

> $$= PV \cdot (1+i)^t$$

- For a series of cash flows $C_{t_k}$ occurring at times $t_k \leq t$, the total accumulated value at time $t$ is:

> $$AV = \sum_k C_{t_k} \cdot \frac{a(t)}{a(t_k)}$$

> $$= \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$

- The ratio $a(t)/a(s)$ for $t > s$ is the **accumulation factor** from $s$ to $t$.
- Under compound interest at rate $i$, this equals $(1+i)^{t-s}$.

![[Media/Figures/Accumulated_Value.svg|340]]

> [!example]- Accumulated Value of a Savings Plan {Example}
> An investor deposits \$$500$ today and \$$800$ two years from now into an account earning $i = 5\%$ per year effective. What is the total accumulated value at the end of 4 years?
>
> > [!answer]-
> > Accumulate each deposit to time 4:
> > $$AV = 500 \times (1.05)^4 + 800 \times (1.05)^2$$
> > $$= 500 \times 1.21551 + 800 \times 1.10250$$
> > $$= 607.75 + 882.00 = \$1{,}489.75$$
