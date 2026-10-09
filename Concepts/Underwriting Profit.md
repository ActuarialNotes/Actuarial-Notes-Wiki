---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:742e5be95962086216d31f969a42d07fb86bf8b5c127a0df948d1e3ec43275f0
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.10 (PDF p.22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.43 (PDF p.55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Profit.md
---

**Underwriting Profit** is income from the insurance operation alone — earned premium less incurred losses, LAE and underwriting expenses — before any credit for investment income.

> $$\text{UW Profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$

> $$\text{UW Profit Margin} = 1 - \text{Combined Ratio}$$

- The margin and the [[Combined Ratio|combined ratio]] are the same statement: a $98\%$ combined ratio is a $2\%$ underwriting margin. Both must state their basis to be comparable — the combined ratio has historically put underwriting expenses over written premium, while companies that measure expenses incurred throughout the policy against earned premium may define it as the loss ratio plus the operating expense ratio.
- Underwriting profit is **not** total profit. An insurer holds policyholder-supplied funds — [[Unearned Premium|unearned premium]] and loss reserves — between collecting premium and paying claims, and the investment income on those funds is a real part of the return. Total profit is underwriting profit plus investment income, which also includes income on the company's own capital (whether that income belongs in ratemaking is a matter of substantial disagreement).
- This is why a combined ratio above $100\%$ is not automatically a failure. In long-tailed lines (personal auto bodily injury, workers compensation) years may pass between the premium and the settlement of all claims, and the investment income can be large enough to accept an underwriting loss and still achieve the target total return; in short-tailed lines (auto collision, homeowners) the investment income is small and underwriting profit is a larger part of the return. Combined ratios of lines with different payout patterns do not compare directly.
- In ratemaking, the actuary typically determines the **target** underwriting profit provision $Q_T$ needed to achieve the target total rate of return after consideration of investment income — see [[Profit and Contingency Provision]].
- A **calendar-year** underwriting result mixes in old business: calendar-year reported losses are payments plus the change in case reserves during the year, and may include payments and reserve changes on claims from policies issued years ago. Accident-year aggregation matches losses to the premium earned in the same year better, at the cost of estimating future development.

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
> > $1 - 0.98 = 0.02\;\checkmark$. Whether $2\%$ is enough depends on the line's investment income: a short-tailed book relies on underwriting profit for most of its return, so $2\%$ may be thin; a long-tailed book earns more investment income on its reserves and needs less underwriting profit to reach the same total return.

> [!example]- Two Lines, Same Combined Ratio, Different Answers {Example}
> Two books each write $\$50{,}000{,}000$ of premium at a $102\%$ combined ratio. Book A is auto physical damage, paying claims in $0.5$ years on average; Book B is workers compensation, paying in $5.0$ years. Both hold reserves earning $4\%$ after tax; premium-to-surplus is $2:1$ in both, and surplus earns $4\%$ after tax. Underwriting results are taxed at $21\%$. The target after-tax return on equity is $12\%$.
>
> Which book meets its target?
>
> > [!answer]-
> > Per $\$1$ of premium, surplus is $\$0.50$ and required after-tax income is $0.12 \times 0.50 = \$0.060$.
> >
> > The underwriting result is $-\$0.02$ per premium dollar in both books before tax; after the $21\%$ tax credit on the loss it is $-0.02 \times (1 - 0.21) = -\$0.0158$, on the same after-tax basis as the yields and the target.
> >
> > **Reserve float** is roughly premium $\times$ loss ratio $\times$ payout duration. Using a $70\%$ loss ratio:
> >
> > $$\begin{align*}
> > \text{Book A float} &= 0.70 \times 0.5 = \$0.35 \\
> > \text{Book B float} &= 0.70 \times 5.0 = \$3.50
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Book A income} &= -0.0158 + 0.04(0.35 + 0.50) \\
> > &= -0.0158 + 0.034 = \$0.018 \\[6pt]
> > \text{Book B income} &= -0.0158 + 0.04(3.50 + 0.50) \\
> > &= -0.0158 + 0.160 = \$0.144
> > \end{align*}$$
> >
> > Against the required $\$0.060$: **Book A falls well short** ($\$0.018$) while **Book B comfortably exceeds it** ($\$0.144$).
> >
> > Identical combined ratios, opposite conclusions. This is the argument for a line-specific target underwriting profit provision, and the reason a long-tailed line can accept an underwriting loss and still achieve its target total return.
