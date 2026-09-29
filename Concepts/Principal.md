---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:88ee33b914339a306c88d22467aeec641ea14c47e80cbf9a2fe85e3da7030cf2
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principal.md
---

The **principal** $L$ is the original amount borrowed in a loan.

- It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$).
- Over the life of an amortized loan, each payment covers interest on the [[Outstanding Balance]] plus a portion of principal repayment; the outstanding balance decreases until the entire principal has been returned to the lender by the final payment.
- The distinction between principal and interest is important for tax purposes, accounting, and the construction of an [[Amortization Schedule]].

![[Media/Figures/Principal.svg|340]]

> [!example]- Principal vs Interest in a Loan Payment {Example}
> A borrower takes out a \$$15{,}000$ loan at $6\%$ annual interest, to be repaid with level annual payments over 5 years. How much of the very first payment is principal and how much is interest?
>
> > [!answer]-
> > **Payment**: $P = 15000 / a_{\overline{5}|6\%} = 15000 / 4.212364 = \$3{,}560.95$
> >
> > **Interest in payment 1**: $I_1 = L \times i = 15000 \times 0.06 = \$900.00$
> >
> > **Principal in payment 1**: $PR_1 = P - I_1 = 3560.95 - 900.00 = \$2{,}660.95$
> >
> > After the first payment the outstanding balance is $15000 - 2660.95 = \$12{,}339.05$. In subsequent payments the interest portion shrinks and the principal portion grows, but the total payment stays constant at \$$3{,}560.95$.
