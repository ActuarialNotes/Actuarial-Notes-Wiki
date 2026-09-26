---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f0737775e0d5ef69bd8721d4dbb654f5636ba87b220a34e36b784dba61da9219
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payment Amount.md
---

The **payment amount** $P$ is the level amount paid each period under an [[Annuities|annuity]] or an amortized [[Loans|loan]]; it is found by dividing the value of the payment stream by the matching annuity factor, and each loan payment splits into [[Interest|interest]] on the outstanding balance plus repayment of [[Principal|principal]].

> $$P = \frac{L}{a_{\overline{n}|i}}$$

> $$P = \frac{PV}{\ddot{a}_{\overline{n}|i}}$$

> $$P = \frac{FV}{s_{\overline{n}|i}}$$

- $L$ is the loan principal, $n$ the number of payments and $i$ the effective rate **per payment period**. Use $a_{\overline{n}|}$ for payments at the end of each period ([[Annuity Immediate]]), $\ddot{a}_{\overline{n}|} = (1+i)\,a_{\overline{n}|}$ for payments at the start ([[Annuity Due]]), and $s_{\overline{n}|}$ to accumulate to a target. If the rate is quoted on another period, convert it first — see [[Payment Period]].
- **Interest and principal in the $k$-th payment** of a level-payment loan:

> $$I_k = i \cdot OB_{k-1} = P\left(1 - v^{\,n-k+1}\right)$$

> $$PR_k = P\,v^{\,n-k+1}$$

- The principal portions grow by the factor $(1+i)$ each period while the interest portions shrink — the pattern laid out row by row in an [[Amortization Schedule]]. The [[Outstanding Balance]] after $k$ payments is $OB_k = P\,a_{\overline{n-k}|}$.
- Given any four of principal, rate, payment amount, [[Term of Loan|term]] and payment period, the fifth follows. When the term is not a whole number of level payments, the last one is a [[Drop Payment]] or [[Balloon Payment]].
- **Namesake.** This is the FM annuity/loan payment. The page [[Payment]] is Exam P's *insurance* payment $Y$ — what an insurer pays on a loss after a deductible and limit.

> [!example]- Monthly Payment and Its Interest/Principal Split {Example}
> A \$30,000 loan is repaid with level monthly payments over 5 years at 6% convertible monthly. Find the payment, and the interest and principal in the 25th payment.
>
> > [!answer]-
> > The rate per month is $0.06/12 = 0.005$ and $n = 60$.
> >
> > $$
> > \begin{align*}
> > P &= \frac{30{,}000}{a_{\overline{60}|0.005}} \\
> > &= \frac{30{,}000}{51.7256} \\
> > &= 579.98
> > \end{align*}
> > $$
> >
> > For $k = 25$ there are $n - k + 1 = 36$ payments left including this one:
> >
> > $$
> > \begin{align*}
> > PR_{25} &= 579.98\,(1.005)^{-36} \\
> > &= 484.66 \\
> > I_{25} &= 579.98 - 484.66 \\
> > &= 95.32
> > \end{align*}
> > $$
> >
> > Check: $OB_{24} = P\,a_{\overline{36}|0.005} = 19{,}064.66$ and $0.005 \times 19{,}064.66 = 95.32$. Two years in, about 84% of each payment is already repaying principal.

> [!example]- Structured Settlement Paid in Advance {Example}
> An insurer settles a bodily injury claim by buying an annuity for \$500,000. It pays the claimant a level amount at the start of each year for 20 years, at an effective rate of 4%. Find the annual payment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{20}|0.04} &= 1.04 \times 13.5903 \\
> > &= 14.1339 \\
> > P &= \frac{500{,}000}{14.1339} \\
> > &= 35{,}375.84
> > \end{align*}
> > $$
> >
> > The claimant receives \$35,375.84 a year. Paid at year-end instead, the payment would be $1.04$ times larger, \$36,790.88, because each payment waits a year longer.
