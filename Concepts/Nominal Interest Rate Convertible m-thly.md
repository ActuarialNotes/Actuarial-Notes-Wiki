---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:8c699aab8011221f468ff4572396187157b8be65971e33e0447166f2bc4f538a
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.86-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §2 p.15, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §9 p.66, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nominal Interest Rate Convertible m-thly.md
---

The **nominal interest rate convertible $m$-thly**, denoted $i^{(m)}$, is an annual rate that is compounded $m$ times per year. Each period, interest at rate $i^{(m)}/m$ is credited.

- The relationship to the effective annual rate $i$ is:

> $$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$

>
> $$i^{(m)} = m\!\left[(1+i)^{1/m} - 1\right]$$

- As $m \to \infty$, $i^{(m)} \to \delta$ (the [[Force of Interest]]).
- When interest is credited only at the end of each conversion period, the balance stays level between credit dates and jumps on each one (a step function), so a target that $(1 + i^{(m)}/m)^{mt}$ first reaches at a time $t$ between credit dates is actually reached at the first conversion date on or after $t$.
- See also: [[Convertible m-thly]] and [[Nominal Discount Rate Convertible m-thly]].

![[Media/Figures/Nominal_Interest_Rate_Convertible_m-thly.svg|340]]

> [!example]- Converting Annual to Quarterly Rate {Example}
> The effective annual rate is $8\%$. Find the nominal rate convertible quarterly $i^{(4)}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > i^{(4)} &= 4\left[(1.08)^{1/4} - 1\right] \\
> >   &= 4(1.0194265 - 1) \\
> >   &= 4(0.0194265) \\
> >   &= 0.077706 = 7.771\%
> > \end{align*}
> > $$
> > Check: $(1 + 0.077706/4)^4 = (1.0194265)^4 = 1.08$.
