---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b8a649469441da0507a557729d1afa00a857dd94ccdc8a1b724ddd8dd0619a22
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions, PDF p.14, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest, PDF p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest (Theorem 6.1), PDF p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10 Force of Interest: Continuous Compounding, PDF p.78, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10 Force of Interest: Continuous Compounding, PDF p.80, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §11 Time Varying Interest Rates, PDF p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Accumulation Function.md
---

The **accumulation function** $a(t)$ gives the accumulated value at time $t \geq 0$ of 1 unit invested at time 0. It must satisfy $a(0) = 1$ and be non-decreasing.

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- Three standard forms arise from different interest assumptions:

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
