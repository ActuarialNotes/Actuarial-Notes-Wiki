---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:38582140836692e9a20c4ebd36def4223a3a88f727f69af94622c6d4217c42fb
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 10, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 86, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.80-82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §11, PDF p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Variable Force of Interest.md
---

A **variable (time-varying) force of interest** $\delta(t)$ allows the instantaneous rate of interest to change over time. The [[Accumulation Function]] from time $0$ to time $t$ is:

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- The accumulation from time $s$ to time $t$ ($s < t$) is:

> $$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$

- Solving [[Time Value of Money Equations]] under variable force of interest requires evaluating these integrals.

![[Media/Figures/Variable_Force_of_Interest.svg|340]]

> [!example]- Accumulation Under Variable Force {Example}
> The force of interest at time $t$ is $\delta(t) = 0.04 + 0.002t$. Find the accumulation of $1$ from $t=0$ to $t=3$.
>
> > [!answer]-
> > $$\int_0^3 (0.04 + 0.002t)\,dt = [0.04t + 0.001t^2]_0^3 = 0.12 + 0.009 = 0.129$$
> > $$a(3) = e^{0.129} \approx 1.1378$$
