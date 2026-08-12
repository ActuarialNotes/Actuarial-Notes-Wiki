**Fixed Expenses** are underwriting expenses that do not vary with the size of the premium — policy issuance, most general expenses, inspections, filing fees, part of "other acquisition". They cost roughly the same on a $\$500$ policy as on a $\$5{,}000$ one, so they are recovered as a **dollar amount per exposure**, not as a percentage of premium.

> $$F = \frac{\text{Total Fixed Expenses}}{\text{Earned Exposures}}$$

> $$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ enters the **numerator** of the rate; [[Variable Expenses|variable expenses]] $V$ and the profit provision $Q_T$ enter the **denominator**. This asymmetry is the whole content of the fixed/variable distinction, and it is what makes the rate a flat charge plus a proportional gross-up.
- Loading fixed expenses as a percentage of premium instead — the **all-variable expense method** — makes large policies subsidize small ones. It remains common because it is simpler and because the distortion is invisible in aggregate: the overall rate level is unchanged, only its distribution across policy sizes is wrong.
- Expense studies rarely split cleanly. Werner's practical approach is to assign each expense category a **fixed percentage** based on judgment and the company's cost structure (e.g. general expenses $75\%$ fixed, other acquisition $50\%$ fixed), then convert the fixed dollars to a per-exposure amount using the projected average premium or exposure count.
- Because $F$ is a dollar amount, it must be **trended** if fixed costs are inflating and the exposure count is not. Werner's simplification — assuming fixed expenses inflate at the same rate as premium — is only safe when the two genuinely move together.
- The fixed provision is also where the [[Minimum Premium|minimum premium]] comes from: below some policy size, $F$ plus the pure premium exceeds what any percentage-based rate would produce, and the minimum premium is what makes small policies viable.

![[Media/Figures/Fixed_Expenses.svg|340]]

> [!example]- Fixed Expense Load in the Rate {Example}
> An insurer has $\$500{,}000$ of fixed expenses and $10{,}000$ earned exposures. The projected pure premium is $\$200$, variable expenses are $20\%$ of premium, and the target underwriting profit provision is $5\%$.
>
> Compute the indicated rate.
>
> > [!answer]-
> > $$\begin{align*}
> > F &= \frac{\$500{,}000}{10{,}000} = \$50 \text{ per exposure} \\[6pt]
> > \text{Rate} &= \frac{\$200 + \$50}{1 - 0.20 - 0.05} \\
> > &= \frac{\$250}{0.75} \\
> > &= \$333.33
> > \end{align*}$$
> >
> > Checking the decomposition of the $\$333.33$:
> >
> > | Component | Amount | Share |
> > |---|---|---|
> > | Losses and LAE | $\$200.00$ | $60.0\%$ |
> > | Fixed expenses | $\$50.00$ | $15.0\%$ |
> > | Variable expenses | $\$66.67$ | $20.0\%$ |
> > | Profit | $\$16.67$ | $5.0\%$ |
> > | **Total** | $\$333.33$ | $100\%$ |
> >
> > The variable expenses and profit come to exactly $25\%$ of the *final* rate, which is why they belong in the denominator — they are a percentage of the answer, not of the input.

> [!example]- The Distortion from Treating Fixed as Variable {Example}
> The same insurer writes two risks: a small one with a pure premium of $\$80$ and a large one with a pure premium of $\$1{,}200$. Compare the correct rates with an all-variable method that loads the fixed expense ratio ($\$50/\$333 = 15\%$) as a percentage.
>
> > [!answer]-
> > **Correct (fixed per exposure):**
> >
> > $$\begin{align*}
> > \text{Small} &= \frac{\$80 + \$50}{0.75} = \$173.33 \\[4pt]
> > \text{Large} &= \frac{\$1{,}200 + \$50}{0.75} = \$1{,}666.67
> > \end{align*}$$
> >
> > **All-variable** ($V + F\% + Q = 0.20 + 0.15 + 0.05 = 0.40$):
> >
> > $$\begin{align*}
> > \text{Small} &= \frac{\$80}{0.60} = \$133.33 \\[4pt]
> > \text{Large} &= \frac{\$1{,}200}{0.60} = \$2{,}000.00
> > \end{align*}$$
> >
> > The all-variable method under-charges the small risk by $23\%$ and over-charges the large one by $20\%$. It implicitly claims that issuing the large policy costs $\$300$ of fixed expense against the small policy's $\$20$ — when both cost about $\$50$.
> >
> > Left in place, this is not merely inequitable. A competitor using the correct split will quote the large risk $\$333$ cheaper and take it, leaving the insurer with the small risks it has been under-pricing.
