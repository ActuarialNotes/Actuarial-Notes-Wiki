---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:74f3d62ac9d322ab8c4c1155803466561910700a51dc9db29e16f9ebe0fb7368
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 10, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 214, solutions PDF p.54, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.78-82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Force of Interest.md
---

The **force of interest** $\delta$ is the continuously compounded [[Interest Rate]] — the limiting case of a [[Nominal Interest Rate]] [[Convertible m-thly]] as $m \to \infty$:

> $$\delta = \ln(1+i)$$

> $$i = e^\delta - 1$$

- Under a constant force of interest, the [[Accumulation Function]] is:

> $$a(t) = e^{\delta t}$$

- For a time-varying force $\delta(t)$:

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t)$.

![[Media/Figures/Force_of_Interest.svg|340]]

> [!example]- Converting Force of Interest to Effective Rate {Example}
> The force of interest is $\delta = 0.05$ per year. Find the equivalent effective annual rate.
>
> > [!answer]-
> > $$i = e^{0.05} - 1 = 1.05127 - 1 = 5.127\%$$
