---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:98beb7b5ccaf054948469de5a30d0c3ab08b9f6a0834c52ddece6bdf60f07c52
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 9, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 214, solutions PDF p.54, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.84-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Nominal Discount Rate Convertible m-thly.md
---

The **nominal discount rate convertible $m$-thly**, denoted $d^{(m)}$, is an annual discount rate under which interest is paid at the **beginning** of each of $m$ sub-periods per year at rate $d^{(m)}/m$.

- The relationship to the effective annual rate $i$ (and effective discount rate $d$) is:

> $$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d$$

> $$= v$$

> $$= \frac{1}{1+i}$$

> $$d^{(m)} = m\!\left[1 - v^{1/m}\right]$$

> $$= m\!\left[1 - (1+i)^{-1/m}\right]$$

- As $m \to \infty$, $d^{(m)} \to \delta$ (the [[Force of Interest]]).
- The nominal discount rate satisfies $d^{(m)} < i^{(m)}$ for all $m$.

![[Media/Figures/Nominal_Discount_Rate_Convertible_m-thly.svg|340]]

> [!example]- Finding Nominal Discount Rate {Example}
> The effective annual interest rate is $6\%$. Find $d^{(12)}$.
>
> > [!answer]-
> > $v = 1/1.06$. Thus $d^{(12)} = 12[1 - (1.06)^{-1/12}] = 12[1 - 0.99515] = 12(0.00485) = 5.82\%$.
