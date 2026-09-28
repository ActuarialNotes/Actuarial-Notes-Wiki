---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2cebfba5eccfe3a58c050bc49e0b07998f6f94939b0d2a274d413a161991844b
  sources:
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 402, questions PDF p.170, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 402, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 406, questions PDF p.172, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 406, solutions PDF p.107, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §52, PDF p.454-455, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Real Rate of Interest.md
---

The **real rate of interest** $i_r$ adjusts the nominal [[Interest Rate]] $i$ for the effect of [[Inflation]] $r$, representing the true growth in purchasing power:

> $$1 + i_r = \frac{1+i}{1+r}$$

> $$i_r \approx i - r \text{ (for small rates)}$$

- If the nominal rate exceeds inflation, the real rate is positive (purchasing power grows).
- If inflation exceeds the nominal rate, the real rate is negative.
- The real rate is essential for comparing investment returns across different inflationary environments.

![[Media/Figures/Real_Rate_of_Interest.svg|340]]

> [!example]- Inflation-Adjusted Return {Example}
> A bond pays a nominal yield of 8%. Inflation is running at 3%. Find the real rate of interest.
>
> > [!answer]-
> > $$i_r = \frac{1.08}{1.03} - 1 = 1.04854 - 1 = 4.854\%$$
> > The investor's purchasing power grows at approximately 4.85% per year.
