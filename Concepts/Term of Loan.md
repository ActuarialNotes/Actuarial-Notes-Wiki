---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7e9142a8c9ce06cb8177ac0c9329e846cfa298b5533ffb0772f87cd05652cf2
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 380, questions PDF p.161, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Term of Loan.md
---

The **term of a loan** is the total number of payment periods until the loan is fully repaid.

- Along with the [[Interest Rate]], [[Principal]], and payment amount, it is one of the four key variables in a loan calculation — given any three, the fourth can be solved.
- When the term is not an integer, the last payment may differ from the regular payments. This smaller final payment is called a [[Drop Payment]] (if it occurs at the same time as a regular payment) or a [[Balloon Payment]] (if it is larger than a regular payment).

![[Media/Figures/Term_of_Loan.svg|340]]

> [!example]- Solving for Term {Example}
> A $5{,}000$ loan at $8\%$ annual interest is repaid with annual payments of $900$. Find the term.
>
> > [!answer]-
> > $5000 = 900 \cdot a_{\overline{n}|8\%}$ $\implies$ $a_{\overline{n}|} = 5.556$.
> > $n = \frac{-\ln(1 - 0.08 \times 5.556)}{\ln(1.08)} = \frac{-\ln(0.5556)}{0.07696} = \frac{0.5878}{0.07696} \approx 7.64$ years.
> > 8 payments needed, with a smaller final payment.
