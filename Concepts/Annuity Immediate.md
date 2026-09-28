---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f289f3af6e4b1d3c4ee5585bac779479cef8de9c2b320cace7e67b7a9dc9d53e
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Annuity Immediate.md
---

An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period. The present value, valued one period before the first payment, is $a_{\overline{n}|}$, and the accumulated value at the time of the last payment is $s_{\overline{n}|}$.

> $$a_{\overline{n}|} = \frac{1-v^n}{i}$$

> $$= \frac{1-(1+i)^{-n}}{i}$$

> $$s_{\overline{n}|} = \frac{(1+i)^n - 1}{i}$$

- The two are related by $s_{\overline{n}|} = (1+i)^n \cdot a_{\overline{n}|}$.
- For a level payment of $P$ per period, multiply through by $P$.
- The annuity-immediate is the standard building block for loan amortisation, bond pricing, and insurance reserve calculations.

![[Media/Figures/Annuity_Immediate.svg|340]]

> [!example]- Present Value of a 5-Year Annuity-Immediate {Example}
> An annuity pays \$$1{,}200$ at the end of each year for 5 years. The effective annual interest rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > $$PV = 1{,}200 \cdot a_{\overline{5}|0.06} = 1{,}200 \cdot \frac{1-(1.06)^{-5}}{0.06}$$
> > $$(1.06)^{-5} \approx 0.74726, \quad a_{\overline{5}|} = \frac{1-0.74726}{0.06} = \frac{0.25274}{0.06} \approx 4.2124$$
> > $$PV = 1{,}200 \times 4.2124 \approx \$5{,}054.87$$
