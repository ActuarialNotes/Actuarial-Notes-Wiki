---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:687ce47f27d161fd6f3adec947fec70ea7e5792314d81cd428d5737582bacf87
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Reserve Discounting.md
---

**Loss Reserve Discounting** is carrying unpaid losses and LAE at the present value of their expected payments rather than at their nominal amount. For a U.S. P&C insurer its main force is in **tax**: IRC §846 requires the reserves deducted in taxable income to be discounted, although the statutory balance sheet generally carries them undiscounted — so discounting accelerates tax without changing the total deducted.

> $$\text{Discounted reserve} = \sum_{k=1}^{n} \frac{P_k}{(1+r)^{\,k - 1/2}}$$

> $$\text{DTA} = t \times (\text{Undiscounted} - \text{Discounted})$$

- $P_k$ is the payment expected in the $k$-th year after the valuation date, assumed made mid-year; $r$ is the discount rate; $t$ is the tax rate ($21\%$); DTA is the resulting deferred tax asset.
- **§846 mechanics.** Discounting is done by line of business and accident year from three inputs: the undiscounted unpaid losses and LAE on the annual statement; the IRS rate for the calendar year in which the accident year ends; and the IRS loss payment pattern for the line, redetermined every five years from aggregate annual statement data, with losses assumed paid mid-year. Long-tail lines are given a longer payout. The discounted amount may never exceed the annual statement amount.
- **Since the TCJA** the rate is based on a 60-month average of the corporate bond yield curve (before 2018 it rested on federal mid-term rates), the payout assumed for long-tail lines was extended, and the election to use the company's own payment pattern was repealed. A higher rate and a longer payout both enlarge the discount, bringing tax forward.
- **Effect on the insurer.** Discounting defers the deduction; it does not remove it. Over the life of the claims the deductions add up to the payments. What the insurer loses is the time value of tax paid early, and it carries the prepaid tax as a deferred tax asset — admitted under statutory accounting only within limits.
- **Book discounting is a different matter.** Statutory accounting prohibits discounting except **tabular** discounting of fixed, reasonably determinable payment streams (workers compensation indemnity, long-term disability); non-tabular discounting needs a permitted practice and disclosure. GAAP is broadly the same; [[IFRS]] 17 requires discounting. The actuarial side is governed by ASOP No. 20 on discounting claim estimates (see [[Actuarial Standards of Practice]]).

> [!example]- The Tax Cost of a Discounted Reserve {Example}
> At year end an insurer books a new reserve of $\$10{,}000$, expected to be paid $\$5{,}000$, $\$3{,}000$ and $\$2{,}000$ over the next three years, mid-year. The applicable §846 rate is $4\%$ and the tax rate $21\%$. Assume the claims pay exactly as expected.
>
> Compare the tax deductions with the statutory charge, year by year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > D_0 &= \frac{5{,}000}{1.04^{0.5}} + \frac{3{,}000}{1.04^{1.5}} + \frac{2{,}000}{1.04^{2.5}} \\
> > &= 9{,}544.70 \\
> > D_1 &= \frac{3{,}000}{1.04^{0.5}} + \frac{2{,}000}{1.04^{1.5}} \\
> > &= 4{,}827.47 \\
> > D_2 &= \frac{2{,}000}{1.04^{0.5}} \\
> > &= 1{,}961.16
> > \end{align*}
> > $$
> >
> > Each year's tax deduction is paid losses plus the change in discounted reserves:
> >
> > $$
> > \begin{align*}
> > \text{Year 0} &= 9{,}544.70 \\
> > \text{Year 1} &= 5{,}000 + 4{,}827.47 - 9{,}544.70 \\
> > &= 282.77 \\
> > \text{Year 2} &= 3{,}000 + 1{,}961.16 - 4{,}827.47 \\
> > &= 133.69 \\
> > \text{Year 3} &= 2{,}000 - 1{,}961.16 \\
> > &= 38.84
> > \end{align*}
> > $$
> >
> > The deductions total $\$10{,}000$, the same as the statutory charge — but statutory income takes all $\$10{,}000$ in year 0. Taxable income is therefore $\$455.30$ higher in year 0, costing $0.21 \times 455.30 = \$95.61$ of tax, recovered as $\$59.38$, $\$28.07$ and $\$8.16$ over the next three years. The $\$95.61$ is carried as a deferred tax asset. Discounted at $4\%$ the recoveries are worth about $\$90.30$, so discounting costs the insurer roughly $\$5$ in present value.

> [!example]- Reserve Strengthening and the Tax Shield {Example}
> An insurer strengthens reserves on a mature accident year by $\$20$M. The §846 factor for that line and accident year is $0.85$; the tax rate is $21\%$. What is the effect on current tax, deferred tax, statutory net income and statutory surplus?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Tax deduction} &= 0.85 \times 20 \\
> > &= 17.0 \\
> > \text{Current tax saved} &= 0.21 \times 17.0 \\
> > &= 3.57 \\
> > \text{Increase in DTA} &= 0.21 \times (20 - 17.0) \\
> > &= 0.63
> > \end{align*}
> > $$
> >
> > Statutory net income records only current tax, so it falls by $20 - 3.57 = \$16.43$M. The $\$0.63$M deferred tax benefit goes directly to surplus (if admissible), so surplus falls by $\$15.80$M — the full after-tax $0.79 \times 20$. On a GAAP basis net income itself falls by $\$15.80$M. The strengthening is only partly tax-shielded in the year it is booked.
