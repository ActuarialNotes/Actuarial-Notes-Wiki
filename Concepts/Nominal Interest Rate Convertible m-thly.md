---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2073824f16e34758e7e7596575414d665d1ea927ade76eed373ad7d171137d5f
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.78, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Nominal Interest Rate Convertible m-thly.md
---

The **nominal interest rate convertible $m$-thly**, denoted $i^{(m)}$, is an annual rate that is compounded $m$ times per year. Each period, interest at rate $i^{(m)}/m$ is credited.

- The relationship to the effective annual rate $i$ is:

> $$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$

>
> $$i^{(m)} = m\!\left[(1+i)^{1/m} - 1\right]$$

- As $m \to \infty$, $i^{(m)} \to \delta$ (the [[Force of Interest]]).
- See also: [[Convertible m-thly]] and [[Nominal Discount Rate Convertible m-thly]].

![[Media/Figures/Nominal_Interest_Rate_Convertible_m-thly.svg|340]]

> [!example]- Converting Annual to Quarterly Rate {Example}
> The effective annual rate is $8\%$. Find the nominal rate convertible quarterly $i^{(4)}$.
>
> > [!answer]-
> > $$i^{(4)} = 4\!\left[(1.08)^{1/4} - 1\right] = 4(1.01943 - 1) = 4(0.01943) = 7.772\%$$
