---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dfbb44910ab1ea500498aeb4bf6f745e30b1281a4dbce2358229fd199b57d61a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expense Ratio.md
---

**Expense Ratio** is underwriting expenses as a share of premium — the non-claim cost of writing and servicing business. Together with the [[Loss Ratio|loss and LAE ratio]] it makes up the [[Combined Ratio|combined ratio]].

> $$\text{UW Expense Ratio} = \frac{\text{Underwriting Expenses}}{\text{Written Premium}}$$

> $$\text{Operating Expense Ratio} = \text{UW Expense Ratio} + \frac{\text{ULAE}}{\text{Earned Premium}}$$

- The statutory **underwriting expense ratio** is conventionally on [[Written Premium|written premium]], because commissions, taxes and acquisition costs are incurred when the policy is written. Expenses incurred as coverage is provided (general expenses) are more properly measured against [[Earned Premium|earned premium]] — Werner computes each category on the denominator that matches when it is incurred.
- The **operating expense ratio** adds [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], which is a claims-handling cost rather than an underwriting expense but is still overhead. Whether ULAE is in the expense ratio or the loss ratio varies by company; the combined ratio is the same either way, which is why comparisons of loss ratios alone across insurers are unreliable.
- For ratemaking the aggregate ratio is not enough: it must be split into [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]] components, because they enter the rate formula in different places — see [[Expense Provisions]].
- The ratio is strongly a function of **distribution**. Direct writers run expense ratios in the low twenties or below; independent agency companies in the low thirties. That difference is a genuine cost advantage, not an efficiency measure.
- In a **growing** book the written-premium denominator flatters the ratio, since this year's acquisition costs are spread over writings that will not be earned until next year. The distortion runs the other way in runoff.

![[Media/Figures/Expense_Ratio.svg|340]]

> [!example]- Underwriting, Operating and Combined Ratios {Example}
> An insurer reports: written premium $\$46{,}000{,}000$; earned premium $\$40{,}000{,}000$; commissions $\$6{,}900{,}000$; premium taxes $\$1{,}150{,}000$; other acquisition $\$1{,}840{,}000$; general expenses $\$2{,}530{,}000$; ULAE $\$1{,}600{,}000$; losses and ALAE $\$27{,}600{,}000$.
>
> Compute the expense ratio, operating expense ratio and combined ratio.
>
> > [!answer]-
> > Underwriting expenses total
> >
> > $$\$6{,}900{,}000 + \$1{,}150{,}000 + \$1{,}840{,}000 + \$2{,}530{,}000 = \$12{,}420{,}000$$
> >
> > $$\begin{align*}
> > \text{UW expense ratio} &= \frac{\$12{,}420{,}000}{\$46{,}000{,}000} = 27.0\% \\[6pt]
> > \text{ULAE ratio} &= \frac{\$1{,}600{,}000}{\$40{,}000{,}000} = 4.0\% \\[4pt]
> > \text{Operating expense ratio} &= 27.0\% + 4.0\% = 31.0\% \\[6pt]
> > \text{Loss \& ALAE ratio} &= \frac{\$27{,}600{,}000}{\$40{,}000{,}000} = 69.0\% \\[4pt]
> > \text{Combined ratio} &= 69.0\% + 4.0\% + 27.0\% = 100.0\%
> > \end{align*}$$
> >
> > The book breaks even on underwriting. Note that ULAE has to appear exactly once — in the loss ratio or the expense ratio — and the combined ratio is unchanged by which side it is put on.

> [!example]- Splitting the Ratio for Ratemaking {Example}
> Using the same expenses, the insurer judges general expenses to be $75\%$ fixed and other acquisition $50\%$ fixed; commissions and taxes are fully variable. Projected average premium is $\$800$.
>
> Derive $V$ and the fixed expense per exposure.
>
> > [!answer]-
> > As percentages of the appropriate premium base (written for commissions, taxes and acquisition; earned for general):
> >
> > $$\begin{align*}
> > \text{Commissions} &= 15.0\% \text{ (written)} \\
> > \text{Taxes} &= 2.5\% \text{ (written)} \\
> > \text{Other acquisition} &= 4.0\% \text{ (written)} \\
> > \text{General} &= 6.3\% \text{ (earned)}
> > \end{align*}$$
> >
> > $$\begin{align*}
> > V &= 15.0 + 2.5 + (4.0 \times 0.5) + (6.3 \times 0.25) \\
> > &= 15.0 + 2.5 + 2.0 + 1.6 \\
> > &= 21.1\% \\[6pt]
> > F\% &= (4.0 \times 0.5) + (6.3 \times 0.75) \\
> > &= 2.0 + 4.7 = 6.7\% \\[4pt]
> > F &= 0.067 \times \$800 = \$53.60 \text{ per exposure}
> > \end{align*}$$
> >
> > The aggregate $27.8\%$ expense ratio is the same number the financial statement reports; the split into $21.1\%$ variable and $\$53.60$ fixed is what the rate formula needs. Only the split tells you how the cost should be distributed across a $\$300$ policy and a $\$3{,}000$ one.
