---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:b1d49e158ef21ee506e9eac0ef86e0953bc7f108814a27a6137fbcbeee97ff3f
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.4, 9-10 (PDF pp.16, 21-22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.126-131 (PDF pp.138-143), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expense Ratio.md
---

**Expense Ratio** is underwriting expenses as a share of premium — the non-claim cost of writing and servicing business. Together with the [[Loss Ratio|loss and LAE ratio]] it makes up the [[Combined Ratio|combined ratio]].

> $$\text{UW Expense Ratio} = \frac{\text{Underwriting Expenses}}{\text{Premium}}$$

> $$\text{Operating Expense Ratio} = \text{UW Expense Ratio} + \frac{\text{LAE}}{\text{Earned Premium}}$$

- The historical **combined ratio** puts all underwriting expenses over [[Written Premium|written premium]]. For the **underwriting expense ratio** itself, Werner splits the categories by when they are incurred: those incurred at the onset of the policy (commissions, other acquisition, taxes, licenses and fees) are measured against written premium, those incurred throughout the policy (general expenses) against [[Earned Premium|earned premium]], and the category ratios are added.
- The **operating expense ratio** adds all loss adjustment expense — allocated and [[Unallocated Loss Adjustment Expenses ULAE|unallocated]] — to the underwriting expense ratio, as a ratio to earned premium: it is the share of each premium dollar spent on loss adjustment and underwriting expenses. Companies may also put LAE in the loss ratio (a *loss and LAE ratio*); whichever is done, LAE must be counted once, so a loss ratio combined with the OER must exclude it.
- For ratemaking, where both kinds are material, the ratio is split into [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]] components, because they enter the rate formula in different places — see [[Expense Provisions]].
- The mix of expenses depends on **distribution**. A national direct writer may incur significant other acquisition costs for advertising; an agency-based company relies more on its agents to generate new business, so its other acquisition costs are lower, but at least partially offset by higher commissions.
- The choice of denominator matters little when volume is stable, since written and earned premium are then about equal. In a **growing** (or shrinking) book, written premium runs proportionately above (or below) earned, and so do acquisition costs — which is why expenses incurred at the onset of the policy are matched to written premium.

![[Media/Figures/Expense_Ratio.svg|340]]

> [!example]- Underwriting, Operating and Combined Ratios {Example}
> An insurer reports: written premium $\$46{,}000{,}000$; earned premium $\$40{,}000{,}000$; commissions $\$6{,}900{,}000$; premium taxes $\$1{,}150{,}000$; other acquisition $\$1{,}840{,}000$; general expenses $\$2{,}530{,}000$; losses $\$25{,}600{,}000$; ALAE $\$2{,}000{,}000$; ULAE $\$1{,}600{,}000$.
>
> Compute the expense ratio, operating expense ratio and combined ratio.
>
> > [!answer]-
> > Underwriting expenses total
> >
> > $$\$6{,}900{,}000 + \$1{,}150{,}000 + \$1{,}840{,}000 + \$2{,}530{,}000 = \$12{,}420{,}000$$
> >
> > $$\begin{align*}
> > \text{UW expense ratio (all to written)} &= \frac{\$12{,}420{,}000}{\$46{,}000{,}000} = 27.0\% \\[6pt]
> > \text{LAE ratio to earned} &= \frac{\$2{,}000{,}000 + \$1{,}600{,}000}{\$40{,}000{,}000} = 9.0\% \\[4pt]
> > \text{Operating expense ratio} &= 27.0\% + 9.0\% = 36.0\% \\[6pt]
> > \text{Loss ratio} &= \frac{\$25{,}600{,}000}{\$40{,}000{,}000} = 64.0\% \\[4pt]
> > \text{Combined ratio} &= 64.0\% + 9.0\% + 27.0\% = 100.0\%
> > \end{align*}$$
> >
> > The book breaks even on underwriting. The combined ratio is also the loss ratio plus the OER, $64.0\% + 36.0\% = 100.0\%$ — which is why the loss ratio in it must exclude LAE: both ALAE and ULAE are already in the OER, and counting either in the loss ratio as well would double count it.

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
> > The total, $21.1\% + 6.7\% = 27.8\%$, is the underwriting expense ratio with general expenses on earned premium, which is why it differs from the $27.0\%$ of the first example, where every category is over written premium. The split into $21.1\%$ variable and $\$53.60$ fixed is what the rate formula needs. Only the split tells you how the cost should be distributed across a $\$300$ policy and a $\$3{,}000$ one.
