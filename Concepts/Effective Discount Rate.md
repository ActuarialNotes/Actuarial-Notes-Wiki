---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:207795d8b43ea3bd4045c14f5b5b8406071c0c6629f532bdf8be31ef241bdf75
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42, PDF p.381, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Effective Discount Rate.md
---

The **effective discount rate** $d$ is the interest paid at the **beginning** of the period rather than the end. On a $1$ investment for one period, $d$ is paid upfront and $1$ is returned at the end:

> $$d = \frac{i}{1+i}$$

> $$= iv$$

> $$= 1 - v$$

- $i$ is the effective [[Interest Rate]] and $v$ is the [[Discount Factor]].
- The relationship between $i$ and $d$ is:

> $$1 - d = v$$

> $$= \frac{1}{1+i}$$

> $$\Longleftrightarrow \qquad i = \frac{d}{1-d}$$

- Under discount, $1$ today accumulates to $\frac{1}{1-d}$ after one period.

![[Media/Figures/Effective_Discount_Rate.svg|340]]

> [!example]- Bank Discount {Example}
> A 91-day T-bill with face value $10{,}000$ is purchased at a bank discount rate of 4%. Find the purchase price and effective annual rate.
>
> > [!answer]-
> > Discount $= 10000 \times 0.04 \times (91/360) = 101.11$. Price $= 10000 - 101.11 = 9898.89$.
> > Effective annual rate: $i = (10000/9898.89)^{365/91} - 1 \approx 4.12\%$.
