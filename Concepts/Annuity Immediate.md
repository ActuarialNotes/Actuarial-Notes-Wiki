---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:67f3bb78f3403a3cd89c1fd1d264234c4729162b4f72bb311b18552cbb240866
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.144-146, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
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
> > $$
> > \begin{align*}
> > a_{\overline{5}|0.06} &= \frac{1-(1.06)^{-5}}{0.06} \\
> > &= \frac{1-0.747258}{0.06} \\
> > &= 4.212364 \\
> > PV &= 1{,}200 \times 4.212364 \\
> > &= \$5{,}054.84
> > \end{align*}
> > $$
