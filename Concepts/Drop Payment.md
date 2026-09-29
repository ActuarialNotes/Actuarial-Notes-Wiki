---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:1d8a05acdb995937afd2660fdcd8104592b6f56f8901abfb9bbc5502bcf9c6cb
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Drop Payment.md
---

A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one period after the last regular payment — on the date the next regular payment would have fallen. It arises when level payments continue for as long as necessary and the [[Term of Loan]] is not a whole number of periods: the drop payment retires the remaining [[Outstanding Balance]].

- If regular payments are $P$ at rate $i$ per period, $n$ is the number of full payments (the integer part of the term), and $B_n$ is the outstanding balance just after the $n$-th payment, the drop payment one period later is:

> $$\text{Drop Payment} = B_n(1+i)$$

- It is smaller than $P$ when $B_n(1+i) < P$, that is $B_n < P\,v$. That is why $n$ counts only *full* payments: if $B_n(1+i) \geq P$, another full payment could still be made.
- This contrasts with a [[Balloon Payment]], which is **larger** than the regular payment: the same remainder is added to the last regular payment instead of being paid a period later.

![[Media/Figures/Drop_Payment.svg|340]]

> [!example]- Identifying and Computing a Drop Payment {Example}
> A loan is repaid with annual payments of $500$. After 6 full payments the outstanding balance is $450$. Find the drop payment at the end of year 7 at $i = 5\%$.
>
> > [!answer]-
> > Since $450 < 500/1.05 = 476.19$, a seventh full payment cannot be made, and the drop payment is $450 \times 1.05 = 472.50$ — less than the regular $500$ payment.
