---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:d7f00b4efe2d9429aa9e688877c4ed09062f0f17bff41e37fece62c2f92b892b
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §24 Analysis of Annuities Payable More Frequently than Interest is Convertible, PDF p.218-220, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'The Basics of Annuity Theory' introduction, PDF p.143, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Payable m-thly.md
---

An annuity **payable $m$-thly** makes $m$ payments per year of $1/m$ each, totaling $1$ per year. The present value of an $n$-year [[Annuity Immediate]] payable $m$-thly uses the modified annuity symbol $a^{(m)}_{\overline{n}|}$:

> $$a^{(m)}_{\overline{n}|} = \frac{1 - v^n}{i^{(m)}}$$

- Here $i^{(m)}$ is the [[Nominal Interest Rate Convertible m-thly]] and $v = 1/(1+i)$.
- Payable $m$-thly annuities arise when cash flows occur monthly, quarterly, or semi-annually rather than annually.

![[Media/Figures/Payable_m-thly.svg|340]]

> [!example]- Monthly Annuity Present Value {Example}
> A 10-year annuity pays $100$ per month (end of month). Find the present value at $i = 6\%$ effective annual.
>
> > [!answer]-
> > $i^{(12)} = 12[(1.06)^{1/12}-1] = 12(0.004868) = 5.842\%$. Annual payment = $1200$.
> > $$\text{PV} = 1200 \cdot \frac{1-(1.06)^{-10}}{i^{(12)}} = 1200 \cdot \frac{0.44161}{0.05842} = 1200 \times 7.557 = 9068$$
