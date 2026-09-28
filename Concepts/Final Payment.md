---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f0be393e5fd9a94a194a2e1d008cbb6e5cb812f1ad4fad3eb0016195f58ed652
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 126, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 337, questions PDF p.142, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Final Payment.md
---

The **final payment** on a loan is the last payment made to retire the outstanding balance, which may differ from the regular payment amount when the [[Term of Loan]] is not an integer number of periods.

- There are two conventions:
  - **[[Drop Payment]]**: the final payment is **smaller** than the regular payment and occurs at the same scheduled payment date
  - **[[Balloon Payment]]**: the final payment is **larger** than the regular payment
- The final payment amount equals the [[Outstanding Balance]] at the previous payment date accumulated by one period.

![[Media/Figures/Final_Payment.svg|340]]

> [!example]- Computing the Drop Payment {Example}
> A $1{,}000$ loan at $6\%$ annual interest is repaid with annual payments of $250$. The term is approximately 4.65 years. Find the drop payment at end of year 5.
>
> > [!answer]-
> > Balance after 4 payments (prospective): $B_4 = 250 \cdot a_{\overline{0.65}|6\%}$ or equivalently by retrospective method. Approximate: $B_4 = 1000(1.06)^4 - 250 \cdot s_{\overline{4}|} = 1262.48 - 1092.73 = 169.75$. Drop payment $= 169.75(1.06) = 179.93$.
