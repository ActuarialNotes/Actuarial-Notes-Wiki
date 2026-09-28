---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:7c8976a24defd2db6ef00dea123fcf3bf8ce6dd77293e188c1c80bdcf2b158b0
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.78-79, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Convertible m-thly.md
---

A [[Nominal Interest Rate]] is **convertible $m$-thly** (or compounded $m$ times per year) when interest is credited $m$ times per year at the periodic rate $i^{(m)}/m$. The equivalent effective annual rate is:

> $$1 + i = \left(1 + \frac{i^{(m)}}{m}\right)^m$$

- Common cases: $m=2$ (semi-annual), $m=4$ (quarterly), $m=12$ (monthly), $m=365$ (daily).
- As $m \to \infty$, the nominal rate convertible $m$-thly approaches continuous compounding and the [[Force of Interest]] $\delta = \ln(1+i)$.

![[Media/Figures/Convertible_m-thly.svg|340]]

> [!example]- Monthly Rate to Annual Effective Rate {Example}
> A savings account pays a nominal rate of 6% convertible monthly ($m=12$). Find the equivalent effective annual rate.
>
> > [!answer]-
> > $$1 + i = \left(1 + \frac{0.06}{12}\right)^{12} = (1.005)^{12} = 1.06168$$
> > $$i = 6.168\%$$
