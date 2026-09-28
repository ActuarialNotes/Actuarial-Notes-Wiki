---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:955d717be5091e99130b737e8ffae3bcba305bfcafdec9c6a10c107f5bcf8e0b
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 380, questions PDF p.161, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Drop Payment.md
---

A **drop payment** is a final loan payment that is **smaller** than the regular scheduled payment, occurring at the same date as a regular payment would occur. It arises when the [[Term of Loan]] is not a whole number of periods — the drop payment retires the remaining [[Outstanding Balance]].

- If regular payments are $P$ and the outstanding balance after $n$ full payments is $B_n > 0$ (with $B_n < P$), then the drop payment is:

> $$\text{Drop Payment} = B_n(1+i)$$

- This contrasts with a [[Balloon Payment]], which is **larger** than the regular payment.

![[Media/Figures/Drop_Payment.svg|340]]

> [!example]- Identifying and Computing a Drop Payment {Example}
> A loan is repaid with annual payments of $500$. After 6 full payments the outstanding balance is $450$. Find the total payment at the end of year 7 if a drop payment convention is used at $i = 5\%$.
>
> > [!answer]-
> > Drop payment $= 450 \times 1.05 = 472.50$, which is less than the regular $500$ payment.
