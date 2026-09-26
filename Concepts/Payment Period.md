---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:895b1ec25ee4aa4fb9ee882e043b1bb7546b394d71bdd0f667e20d1550ab2e70
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payment Period.md
---

The **payment period** is the interval between successive payments of an annuity or loan — monthly, quarterly, annually. Every annuity factor is computed per payment period, so $i$ must be the effective rate for that interval and $n$ the number of such intervals; a rate quoted on any other basis is converted first.

> $$j = (1+i)^{1/m} - 1$$

> $$j = \left(1 + \frac{i^{(k)}}{k}\right)^{k/m} - 1$$

> $$L = P \cdot a_{\overline{mT}|\,j}$$

- $m$ is the number of payments per year, $T$ the [[Term of Loan|term]] in years, $j$ the effective rate per payment period, $i$ the [[Effective Rate|effective annual rate]] and $i^{(k)}$ a [[Nominal Interest Rate Convertible m-thly|nominal rate]] convertible $k$ times a year. When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.
- The same conversion works when payments are *less* frequent than compounding: annual payments at $6\%$ convertible monthly use $j = (1.005)^{12} - 1 = 6.1678\%$.
- An equivalent route keeps an annual rate and uses $m$-thly annuity symbols: $a^{(m)}_{\overline{T}|} = \dfrac{1 - v^T}{i^{(m)}}$ is the value of $1$ per year paid in $m$ instalments of $1/m$.
- **Frequency matters.** At a fixed effective annual rate, more frequent payments repay principal sooner, so the total paid per year is smaller: since $i^{(m)} < i$, $a^{(m)}_{\overline{T}|} > a_{\overline{T}|}$.
- In a loan problem the payment period is one of five linked quantities — term, rate, [[Payment Amount|payment amount]], payment period and [[Principal|principal]]. It is rarely the unknown, but misreading it (a monthly payment against an annual rate) is a classic source of wrong answers.

> [!example]- Monthly Mortgage at a Semiannually Compounded Rate {Example}
> A \$300,000 mortgage is repaid by monthly payments over 25 years. The rate is quoted as 5% convertible semiannually. Find the monthly payment.
>
> > [!answer]-
> > The rate per half-year is $2.5\%$; a month is one-sixth of a half-year.
> >
> > $$
> > \begin{align*}
> > j &= (1.025)^{1/6} - 1 \\
> > &= 0.0041239 \\
> > a_{\overline{300}|\,j} &= \frac{1 - (1.0041239)^{-300}}{0.0041239} \\
> > &= 171.938 \\
> > P &= \frac{300{,}000}{171.938} \\
> > &= 1{,}744.81
> > \end{align*}
> > $$
> >
> > Using $0.05/12 = 0.004167$ per month instead would treat the rate as convertible monthly and overstate the payment.

> [!example]- Annual Versus Quarterly Repayment {Example}
> A \$100,000 loan is repaid over 10 years at an effective annual rate of 8%. Compare the annual payment with the total paid per year if payments are made quarterly.
>
> > [!answer]-
> > Annual payments:
> >
> > $$
> > \begin{align*}
> > P_A &= \frac{100{,}000}{a_{\overline{10}|0.08}} \\
> > &= 14{,}902.95
> > \end{align*}
> > $$
> >
> > Quarterly payments, with $j = (1.08)^{1/4} - 1 = 1.9427\%$ and $40$ periods:
> >
> > $$
> > \begin{align*}
> > P_Q &= \frac{100{,}000}{a_{\overline{40}|\,j}} \\
> > &= 3{,}618.91 \\
> > 4P_Q &= 14{,}475.64
> > \end{align*}
> > $$
> >
> > Check with $i^{(4)} = 4j = 7.7706\%$: $a^{(4)}_{\overline{10}|} = (1 - 1.08^{-10})/0.077706 = 6.9081566$ and $100{,}000/6.9081566 = 14{,}475.64$ per year. Paying quarterly costs \$427.31 less a year, because principal is returned to the lender earlier.
