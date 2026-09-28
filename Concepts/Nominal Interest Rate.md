---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3e8e2c1c259a1d2c9e3ee55bf40277683eefab0856cf1331e5267ef48aac375
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.78, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.86-87, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nominal Interest Rate.md
---

The **nominal interest rate** $i^{(m)}$ is a quoted annual rate convertible (compounded) $m$ times per year. Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.

> $$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

- The two-way relationship with the effective annual rate $i$ is:

> $$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$

> $$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$

- As $m \to \infty$ the nominal rate converges to the [[Force of Interest]]: $\displaystyle\lim_{m\to\infty} i^{(m)} = \delta = \ln(1+i)$.
- For a fixed effective rate, $i^{(m)}$ is a decreasing function of $m$ — more frequent compounding requires a smaller stated rate to achieve the same year-end accumulation.

![[Media/Figures/Nominal_Interest_Rate.svg|340]]

> [!example]- Converting a Nominal Rate to an Effective Rate {Example}
> A savings account advertises a nominal interest rate of $i^{(12)} = 6\%$ convertible monthly. Find the equivalent effective annual interest rate.
>
> > [!answer]-
> > The monthly periodic rate is $6\%/12 = 0.5\%$, so:
> > $$i = \left(1 + \frac{0.06}{12}\right)^{12} - 1 = (1.005)^{12} - 1 \approx 6.168\%$$
