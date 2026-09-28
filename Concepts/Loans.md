---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:757f974dfe031b15768238b367812804072e48ad48ee519a55e039e42841b2d7
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Loan Repayment Methods' introduction, PDF p.333, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Loans.md
---

A **loan** is a financial arrangement in which a lender provides [[Principal]] to a borrower, who repays the amount with [[Interest]] over time according to agreed terms. Key loan concepts include:

- **[[Principal]]**: the initial amount borrowed
- **[[Interest Rate]]**: the cost of borrowing per period
- **[[Term of Loan]]**: the number of periods over which the loan is repaid
- **[[Outstanding Balance]]**: the remaining principal at any point in time
- **[[Amortization]]**: the process of repaying a loan through a series of payments

Loan repayment methods on Exam FM are primarily the **prospective method** (PV of future payments) and **retrospective method** (accumulated value of past payments) for computing the [[Outstanding Balance]].

![[Media/Figures/Loans.svg|340]]

> [!example]- Monthly Mortgage Payment {Example}
> A $200{,}000$ mortgage is repaid with level monthly payments over 30 years at a nominal rate of 6% convertible monthly.
>
> > [!answer]-
> > Monthly rate: $i/12 = 0.5\%$. Number of payments: $n=360$.
> > $$P = \frac{200{,}000}{a_{\overline{360}|0.5\%}} = \frac{200{,}000}{166.792} = 1199.10 \text{ per month}$$
