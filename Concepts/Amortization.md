---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5e58d83a7acbc3aee26ea2e7d9f3ed65073524b92f2c26d6659edac5e035120
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.333, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.342-343, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Amortization.md
---

**Amortization** is the process of repaying a loan through a series of installment payments, usually made at regular intervals: each payment first covers the interest due on the [[Outstanding Balance]], and the rest of it repays principal, so the amount owed is progressively reduced to zero. The payments need not be level, but the common case is a loan $L$ repaid by $n$ level payments $P$ at the end of each period, at rate $i$ per period, where $P$ is determined by:

> $$P = \frac{L}{a_{\overline{n}|i}}$$

- Whatever the payment pattern, the loan equals the present value of its payments, and the interest in each payment is $i$ times the balance at the start of that period — the general relations are on [[Loan Amortization]], and the row-by-row table is the [[Amortization Schedule]].
- With level payments, interest is charged on the declining balance, so the interest portion of each payment decreases over time while the principal portion increases — but the total payment remains constant.
- At the end of the $n$-th payment the loan is exactly paid off.
- Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$
- Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$
- Outstanding balance after payment $k$: $OB_k = P \cdot a_{\overline{n-k}|i}$

![[Media/Figures/Amortization.svg|340]]

> [!example]- Amortizing a Loan {Example}
> A \$$10{,}000$ loan is repaid with level annual payments over 4 years at $i = 5\%$ per year. Find the annual payment and the interest and principal portions of the first payment.
>
> > [!answer]-
> > $$P = \frac{10000}{a_{\overline{4}|5\%}} = \frac{10000}{3.545951} = \$2{,}820.12$$
> > **Payment 1 interest**: $I_1 = 10000 \times 0.05 = \$500.00$
> > **Payment 1 principal**: $PR_1 = 2820.12 - 500.00 = \$2{,}320.12$
> > **Outstanding balance after payment 1**: $OB_1 = 10000 - 2320.12 = \$7{,}679.88$, which equals $P \cdot a_{\overline{3}|5\%} = 2820.118(2.723248) = \$7{,}679.88$.
