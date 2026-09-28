---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7083ecd7abf2ff3b95b0a7246c0f2f5eb613952d285c5da5411dc838c9fafed
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF p.59, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 60, questions PDF p.27, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Outstanding Balance.md
---

**Outstanding balance** (or outstanding loan balance) is the amount still owed on a loan at a given time, calculated by either the prospective or retrospective method.

- **Prospective method** (present value of future payments):

> $$OB_k = P \cdot a_{\overline{n-k}|i}$$

- **Retrospective method** (accumulated value of loan minus accumulated payments):

> $$OB_k = L(1+i)^k - P \cdot s_{\overline{k}|i}$$

- The **outstanding balance** $OB_k$ is the remaining principal owed immediately after the $k$-th payment on a loan of original amount $L$, level payment $P$, interest rate $i$ per period, and $n$ total payments.
- Both formulas give the same result; the prospective method is usually simpler because it only requires the number of remaining payments $(n-k)$, while the retrospective method accumulates the original loan forward and subtracts the accumulated payments.
- Note that the formula $OB_k = L - P\,a_{\overline{k}|i}$ is **incorrect** in general; it would only apply if interest were zero.

![[Media/Figures/Outstanding_Balance.svg|340]]

> [!example]- Outstanding Balance After 3 Payments {Example}
> A \$$20{,}000$ loan is repaid with level annual payments over 6 years at $i = 8\%$. Find the outstanding balance immediately after the 3rd payment using both methods.
>
> > [!answer]-
> > **Payment**: $P = 20000 / a_{\overline{6}|8\%} = 20000 / 4.6229 = \$4{,}326.40$
> >
> > **Prospective**: $OB_3 = P \cdot a_{\overline{3}|8\%} = 4326.40 \times 2.5771 = \$11{,}147.42$
> >
> > **Retrospective**: $OB_3 = 20000(1.08)^3 - 4326.40 \cdot s_{\overline{3}|8\%}$
> > $= 20000(1.2597) - 4326.40(3.2464)$
> > $= 25194.00 - 14041.22 = \$11{,}152.78$
> >
> > The small difference is due to rounding in $P$; with exact arithmetic both methods agree exactly.
