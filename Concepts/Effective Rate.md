---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:652276e9976c6d97cba956a359e09ff1962deb0a1ab53fd6ccfb98863619f6e4
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Effective Rate.md
---

The **effective interest rate** $i$ is the actual rate of interest earned (or paid) per period, accounting for compounding within the period. It is the rate that, applied once per period, produces the same result as any equivalent [[Nominal Interest Rate]] compounded more frequently.

- For a nominal rate $i^{(m)}$ [[Convertible m-thly]]:

> $$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$

- The effective rate is the standard benchmark for comparing interest rates across different compounding frequencies.
- The effective [[Discount Rate]] $d$ satisfies $d = iv = i/(1+i)$.

![[Media/Figures/Effective_Rate.svg|340]]

> [!example]- Comparing Two Rates {Example}
> Which is better: 7% compounded semi-annually, or 6.9% compounded monthly?
>
> > [!answer]-
> > Semi-annual: $i = (1+0.07/2)^2 - 1 = (1.035)^2 - 1 = 7.1225\%$
> > Monthly: $i = (1+0.069/12)^{12} - 1 = (1.00575)^{12} - 1 = 7.1286\%$
> > Monthly compounding is slightly better.
