---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:314e18768cc091c8d36515735184b16b4cb6babb38c478206dd6b59569408557
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Amortization Schedule.md
---

An **amortization schedule** is a table that breaks every loan payment into its interest and principal components, and tracks the [[Outstanding Balance]] over the life of the loan. For a level-payment loan with payment $P$, interest rate $i$, and $n$ periods, each row contains:

| Column | Formula |
|---|---|
| Payment number $k$ | $1, 2, \ldots, n$ |
| Payment amount | $P$ (constant) |
| Interest portion $I_k$ | $OB_{k-1} \times i$ |
| Principal portion $PR_k$ | $P - I_k$ |
| Outstanding balance $OB_k$ | $OB_{k-1} - PR_k$ |

The principal portions form a geometric sequence: $PR_k = PR_1 \cdot (1+i)^{k-1}$. The schedule ends when $OB_n = 0$.

> [!example]- 3-Payment Amortization Schedule {Example}
> A \$$3{,}000$ loan is repaid with 3 level annual payments at $i = 10\%$. Construct the full amortization schedule.
>
> > [!answer]-
> > Payment: $P = 3000 / a_{\overline{3}|10\%} = 3000 / 2.4869 = \$1{,}206.34$
> >
> > | Period | Payment | Interest | Principal | Balance |
> > |---|---|---|---|---|
> > | 0 | — | — | — | $3{,}000.00$ |
> > | 1 | $1{,}206.34$ | $300.00$ | $906.34$ | $2{,}093.66$ |
> > | 2 | $1{,}206.34$ | $209.37$ | $996.97$ | $1{,}096.69$ |
> > | 3 | $1{,}206.34$ | $109.67$ | $1{,}096.67$ | $\approx 0$ |
> >
> > The interest column decreases each period (charged on a smaller balance), while the principal column increases. The small rounding discrepancy in period 3 disappears with exact arithmetic.
