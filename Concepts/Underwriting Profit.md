---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:409884650d4959db9b3f95c2993190747b90387173a560f70bd233a41746c05c
  sources: []
  open_findings: 0
  log: .verify/Concepts/Underwriting Profit.md
---

**Underwriting Profit** is income from the insurance operation alone — earned premium less incurred losses, LAE and underwriting expenses — before any credit for investment income.

> $$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$

> $$\text{UW Profit Margin} = 1 - \text{Combined Ratio}$$

- The margin and the [[Combined Ratio|combined ratio]] are the same statement: a $98\%$ combined ratio is a $2\%$ underwriting margin. Both must state their basis (trade vs. financial) to be comparable.
- Underwriting profit is **not** total profit. An insurer holds policyholder-supplied funds — [[Unearned Premium|unearned premium]] and loss reserves — between collecting premium and paying claims, and the investment income on that float is a real part of the return. Total operating profit is the underwriting result plus investment income.
- This is why a combined ratio above $100\%$ is not automatically a failure. A workers compensation book paying claims over a decade earns substantial float income; a homeowners book paying within months earns almost none. Comparing combined ratios across lines without adjusting for payout duration is meaningless.
- In ratemaking, the **target** underwriting profit provision $Q_T$ is set so that underwriting plus investment income together deliver the required return on capital — see [[Profit and Contingency Provision]]. It is a derived quantity, not a management preference.
- Underwriting profit is also the number most distorted by **reserve movements**: prior-year development runs through the current calendar year's incurred losses, so a calendar-year underwriting profit can be manufactured by weakening reserves. Accident-year results at successive maturities are what reveal the truth ([[Reserve Adequacy]]).

![[Media/Figures/Underwriting_Profit.svg|340]]

> [!example]- Underwriting Profit and Margin {Example}
> An insurer reports earned premium $\$10{,}000{,}000$, incurred losses and LAE $\$6{,}800{,}000$, underwriting expenses $\$3{,}000{,}000$.
>
> Compute the underwriting profit, margin and combined ratio.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{UW profit} &= \$10{,}000{,}000 - \$6{,}800{,}000 - \$3{,}000{,}000 \\
> > &= \$200{,}000 \\[6pt]
> > \text{Margin} &= \frac{\$200{,}000}{\$10{,}000{,}000} = 2.0\% \\[6pt]
> > \text{Combined ratio} &= 68.0\% + 30.0\% = 98.0\%
> > \end{align*}$$
> >
> > $1 - 0.98 = 0.02\;\checkmark$. Whether $2\%$ is a good result depends entirely on the line: for a short-tail property book it is a thin but genuine profit; for a long-tail casualty book it may sit well below the target return once the cost of the capital held against those reserves is charged.

> [!example]- Two Lines, Same Combined Ratio, Different Answers {Example}
> Two books each write $\$50{,}000{,}000$ of premium at a $102\%$ combined ratio. Book A is auto physical damage, paying claims in $0.5$ years on average; Book B is workers compensation, paying in $5.0$ years. Both hold reserves earning $4\%$ after tax; premium-to-surplus is $2:1$ in both, and surplus earns $4\%$ after tax. The target return on equity is $12\%$.
>
> Which book meets its target?
>
> > [!answer]-
> > Per $\$1$ of premium, surplus is $\$0.50$ and required after-tax income is $0.12 \times 0.50 = \$0.060$.
> >
> > The underwriting result is $-\$0.02$ per premium dollar in both books.
> >
> > **Reserve float** is roughly premium $\times$ loss ratio $\times$ payout duration. Using a $70\%$ loss ratio:
> >
> > $$\begin{align*}
> > \text{Book A float} &= 0.70 \times 0.5 = \$0.35 \\
> > \text{Book B float} &= 0.70 \times 5.0 = \$3.50
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Book A income} &= -0.020 + 0.04(0.35 + 0.50) \\
> > &= -0.020 + 0.034 = \$0.014 \\[6pt]
> > \text{Book B income} &= -0.020 + 0.04(3.50 + 0.50) \\
> > &= -0.020 + 0.160 = \$0.140
> > \end{align*}$$
> >
> > Against the required $\$0.060$: **Book A falls well short** ($\$0.014$) while **Book B comfortably exceeds it** ($\$0.140$).
> >
> > Identical combined ratios, opposite conclusions. This is the entire argument for a line-specific target underwriting profit provision, and the reason long-tail lines have historically been written at combined ratios above $100\%$ without that being a pricing failure. (Book B's larger reserves also carry more risk, which a full analysis reflects by allocating it more surplus — narrowing but not eliminating the gap.)
