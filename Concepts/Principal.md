---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b13b0e3b2ba910b6e6dc674e6389cc8749127e797943c057f2afc9f8d3cc763
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2 (redemption value equals face amount unless otherwise stated), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Principal.md
---

The **principal** $L$ is the original amount borrowed in a loan.

- It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$).
- Over the life of an amortized loan, each payment covers interest on the [[Outstanding Balance]] plus a portion of principal repayment; the outstanding balance decreases until the entire principal has been returned to the lender by the final payment.
- In the context of bonds, the term **principal** often refers to the [[Face Value]] or [[Redemption Value]] — the amount repaid at maturity.
- The distinction between principal and interest is important for tax purposes, accounting, and the construction of an [[Amortization Schedule]].

![[Media/Figures/Principal.svg|340]]

> [!example]- Principal vs Interest in a Loan Payment {Example}
> A borrower takes out a \$$15{,}000$ loan at $6\%$ annual interest, to be repaid with level annual payments over 5 years. How much of the very first payment is principal and how much is interest?
>
> > [!answer]-
> > **Payment**: $P = 15000 / a_{\overline{5}|6\%} = 15000 / 4.2124 = \$3{,}560.98$
> >
> > **Interest in payment 1**: $I_1 = L \times i = 15000 \times 0.06 = \$900.00$
> >
> > **Principal in payment 1**: $PR_1 = P - I_1 = 3560.98 - 900.00 = \$2{,}660.98$
> >
> > After the first payment the outstanding balance is $15000 - 2660.98 = \$12{,}339.02$. In subsequent payments the interest portion shrinks and the principal portion grows, but the total payment stays constant at \$$3{,}560.98$.
