---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:d62829837f50d5bb9c907a23c8705bb9e33c8a98fea6ca1ffe6301f017f8c97f
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 9, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.84, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Discount Rate.md
---

The **effective annual discount rate** $d$ is the interest paid at the **beginning** of a period on a loan of 1, rather than at the end. If you borrow 1 today and repay 1 at year-end, the interest charge of $d$ is deducted upfront so you receive only $1-d$ now.

> $$d = \frac{i}{1+i}$$

> $$= 1 - v$$

- The key relationships among $d$, the effective rate $i$, and the discount factor $v = (1+i)^{-1}$ are:

> $$d = iv$$

> $$i = \frac{d}{1-d}$$

- Because interest is collected at the start rather than the end, $d < i$ for any positive interest rate.
- The nominal discount rate convertible $m$-thly, $d^{(m)}$, satisfies $\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d = v$, and as $m \to \infty$, $d^{(m)} \to \delta$.

![[Media/Figures/Discount_Rate.svg|340]]

> [!example]- Finding the Discount Rate from an Effective Rate {Example}
> The effective annual interest rate is $i = 8\%$. Find the effective annual discount rate $d$ and verify the relationship $d = iv$.
>
> > [!answer]-
> > $$d = \frac{i}{1+i} = \frac{0.08}{1.08} \approx 0.07407 = 7.407\%$$
> > Check: $v = 1/1.08 \approx 0.92593$, so $iv = 0.08 \times 0.92593 \approx 0.07407$.
