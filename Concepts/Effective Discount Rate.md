---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfad74cee970023a64414947acfdd8cd805ab8fbb852ac5db14b2c14276856ff
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.381, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Effective Discount Rate.md
---

The **effective discount rate** $d$ measures interest paid at the **beginning** of the period rather than the end: it is the amount of discount during the period divided by the amount at the end of the period. On a loan of $1$ repayable at the end of one period, the borrower pays $d$ upfront and has the use of only $1-d$:

> $$d = \frac{i}{1+i}$$

> $$= iv$$

> $$= 1 - v$$

- $i$ is the effective [[Interest Rate]] and $v$ is the [[Discount Factor]].
- The relationship between $i$ and $d$ is:

> $$1 - d = v$$

> $$= \frac{1}{1+i}$$

> $$i = \frac{d}{1-d}$$

- Under compound discount, $1$ today accumulates to $\frac{1}{1-d}$ after one period and to $(1-d)^{-t}$ after $t$ periods.

![[Media/Figures/Effective_Discount_Rate.svg|340]]

> [!example]- Interest Paid in Advance on a Loan {Example}
> A lender makes a one-year loan with $5{,}000$ repayable at the end of the year, at an effective annual discount rate of $6\%$. How much does the borrower receive today, and what effective annual interest rate is the borrower paying?
>
> > [!answer]-
> > The discount of $0.06 \times 5000 = 300$ is taken upfront, so the borrower receives $5000 - 300 = 4700$. The interest of $300$ is earned on the $4700$ actually lent:
> > $$
> > \begin{align*}
> > i &= \frac{300}{4700} \\
> >   &= 0.063830 = 6.383\%
> > \end{align*}
> > $$
> > The same rate follows from $i = \frac{d}{1-d} = \frac{0.06}{0.94} = 0.063830$.
> > Collecting interest in advance makes a 6% discount rate cost the borrower 6.383% effective.

> [!example]- Bank Discount on a Treasury Bill {Example}
> A 91-day T-bill with face value $10{,}000$ is purchased at a bank discount rate of 4% (simple discount, actual/360 basis). Find the purchase price, the effective annual interest rate, and the effective annual discount rate.
>
> > [!answer]-
> > Discount $= 10000 \times 0.04 \times (91/360) = 101.11$. Price $= 10000 - 101.11 = 9898.89$.
> > $$
> > \begin{align*}
> > i &= \left(\frac{10000}{9898.89}\right)^{365/91} - 1 \\
> >   &= (1.0102143)^{365/91} - 1 \\
> >   &= 0.041604 = 4.160\%
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > d &= \frac{i}{1+i} \\
> >   &= \frac{0.041604}{1.041604} \\
> >   &= 0.039942 = 3.994\%
> > \end{align*}
> > $$
> > The quoted 4% is a simple bank-discount rate, not the effective discount rate $d$: the effective annual discount rate is 3.994%.
